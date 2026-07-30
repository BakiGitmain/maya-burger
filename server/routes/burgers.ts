import "dotenv/config";

import { Router } from "express";

import {
  deleteBurgerImage,
  uploadBurgerImage,
} from "../config/cloudinary.js";

import { pool } from "../db/index.js";

import { requireAdmin } from "../middleware/admin-auth.js";
import { handleBurgerImageUpload } from "../middleware/upload.js";

const router = Router();

type BurgerRecord = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  category: string;
  isAvailable: boolean;
  isFeatured: boolean;
};

type BurgerInput = {
  name: string;
  description: string | null;
  price: number;
  category: string;
  isAvailable: boolean;
  isFeatured: boolean;
};

type ValidationResult =
  | {
      valid: true;
      data: BurgerInput;
    }
  | {
      valid: false;
      message: string;
    };

function parseBoolean(
  value: unknown,
  fallback: boolean
): boolean | null {
  if (value === undefined) {
    return fallback;
  }

  if (
    value === true ||
    value === "true"
  ) {
    return true;
  }

  if (
    value === false ||
    value === "false"
  ) {
    return false;
  }

  return null;
}

function validateBurgerInput(
  body: Record<string, unknown>,
  current?: BurgerRecord
): ValidationResult {
  const rawName =
    body.name ?? current?.name;

  const rawDescription =
    body.description ??
    current?.description ??
    "";

  const rawPrice =
    body.price ?? current?.price;

  const rawCategory =
    body.category ??
    current?.category ??
    "Burgers";

  if (
    typeof rawName !== "string"
  ) {
    return {
      valid: false,
      message: "Burger name is required",
    };
  }

  const name = rawName.trim();

  if (
    name.length < 2 ||
    name.length > 120
  ) {
    return {
      valid: false,
      message:
        "Burger name must be between 2 and 120 characters",
    };
  }

  if (
    typeof rawDescription !== "string"
  ) {
    return {
      valid: false,
      message:
        "Burger description is invalid",
    };
  }

  const description =
    rawDescription.trim();

  if (description.length > 500) {
    return {
      valid: false,
      message:
        "Description cannot exceed 500 characters",
    };
  }

  const price = Number(rawPrice);

  if (
    !Number.isFinite(price) ||
    price <= 0 ||
    price > 99999999.99
  ) {
    return {
      valid: false,
      message:
        "Enter a valid burger price",
    };
  }

  if (
    typeof rawCategory !== "string"
  ) {
    return {
      valid: false,
      message:
        "Burger category is invalid",
    };
  }

  const category =
    rawCategory.trim();

  if (
    category.length < 2 ||
    category.length > 50
  ) {
    return {
      valid: false,
      message:
        "Category must be between 2 and 50 characters",
    };
  }

  const isAvailable =
    parseBoolean(
      body.isAvailable,
      current?.isAvailable ?? true
    );

  const isFeatured =
    parseBoolean(
      body.isFeatured,
      current?.isFeatured ?? false
    );

  if (isAvailable === null) {
    return {
      valid: false,
      message:
        "Availability value is invalid",
    };
  }

  if (isFeatured === null) {
    return {
      valid: false,
      message:
        "Featured value is invalid",
    };
  }

  return {
    valid: true,

    data: {
      name,
      description:
        description || null,
      price,
      category,
      isAvailable,
      isFeatured,
    },
  };
}

function parseBurgerId(
  value: string | string[]
) {
  if (Array.isArray(value)) {
    return null;
  }

  const id = Number(value);

  if (
    !Number.isInteger(id) ||
    id <= 0
  ) {
    return null;
  }

  return id;
}

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT
          id,
          name,
          description,
          price::TEXT AS price,
          image_url AS "imageUrl",
          image_public_id AS "imagePublicId",
          category,
          is_available AS "isAvailable",
          is_featured AS "isFeatured"
        FROM burgers
        ORDER BY id DESC
      `
    );

    return res.status(200).json({
      burgers: result.rows,
    });
  } catch (error) {
    console.error(
      "Get burgers error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to load menu items",
    });
  }
});

router.get(
  "/:id",
  async (req, res) => {
    try {
      const burgerId = parseBurgerId(
        req.params.id
      );

      if (!burgerId) {
        return res.status(400).json({
          message:
            "Burger ID is invalid",
        });
      }

      const result = await pool.query(
        `
          SELECT
            id,
            name,
            description,
            price::TEXT AS price,
            image_url AS "imageUrl",
            image_public_id AS "imagePublicId",
            category,
            is_available AS "isAvailable",
            is_featured AS "isFeatured"
          FROM burgers
          WHERE id = $1
          LIMIT 1
        `,
        [burgerId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message:
            "Menu item not found",
        });
      }

      return res.status(200).json({
        burger: result.rows[0],
      });
    } catch (error) {
      console.error(
        "Get burger error:",
        error
      );

      return res.status(500).json({
        message:
          "Unable to load the menu item",
      });
    }
  }
);

router.post(
  "/",
  requireAdmin,
  handleBurgerImageUpload,
  async (req, res) => {
    let uploadedImage:
      | {
          secureUrl: string;
          publicId: string;
        }
      | null = null;

    try {
      const validation =
        validateBurgerInput(
          req.body ?? {}
        );

      if (!validation.valid) {
        return res.status(400).json({
          message:
            validation.message,
        });
      }

      if (req.file) {
        const uploadResult =
          await uploadBurgerImage(
            req.file.buffer
          );

        uploadedImage = {
          secureUrl:
            uploadResult.secure_url,
          publicId:
            uploadResult.public_id,
        };
      }

      const {
        name,
        description,
        price,
        category,
        isAvailable,
        isFeatured,
      } = validation.data;

      const result = await pool.query(
        `
          INSERT INTO burgers (
            name,
            description,
            price,
            image_url,
            image_public_id,
            category,
            is_available,
            is_featured
          )
          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8
          )
          RETURNING
            id,
            name,
            description,
            price::TEXT AS price,
            image_url AS "imageUrl",
            image_public_id AS "imagePublicId",
            category,
            is_available AS "isAvailable",
            is_featured AS "isFeatured"
        `,
        [
          name,
          description,
          price,
          uploadedImage?.secureUrl ??
            null,
          uploadedImage?.publicId ??
            null,
          category,
          isAvailable,
          isFeatured,
        ]
      );

      return res.status(201).json({
        message:
          "Menu item created successfully",
        burger: result.rows[0],
      });
    } catch (error) {
      if (uploadedImage) {
        await deleteBurgerImage(
          uploadedImage.publicId
        ).catch((cleanupError) => {
          console.error(
            "Cloudinary cleanup error:",
            cleanupError
          );
        });
      }

      console.error(
        "Create burger error:",
        error
      );

      return res.status(500).json({
        message:
          "Unable to create the menu item",
      });
    }
  }
);

router.patch(
  "/:id",
  requireAdmin,
  handleBurgerImageUpload,
  async (req, res) => {
    let uploadedImage:
      | {
          secureUrl: string;
          publicId: string;
        }
      | null = null;

    try {
      const burgerId = parseBurgerId(
        req.params.id
      );

      if (!burgerId) {
        return res.status(400).json({
          message:
            "Burger ID is invalid",
        });
      }

      const currentResult =
        await pool.query(
          `
            SELECT
              id,
              name,
              description,
              price::TEXT AS price,
              image_url AS "imageUrl",
              image_public_id AS "imagePublicId",
              category,
              is_available AS "isAvailable",
              is_featured AS "isFeatured"
            FROM burgers
            WHERE id = $1
            LIMIT 1
          `,
          [burgerId]
        );

      if (
        currentResult.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "Menu item not found",
        });
      }

      const current =
        currentResult
          .rows[0] as BurgerRecord;

      const validation =
        validateBurgerInput(
          req.body ?? {},
          current
        );

      if (!validation.valid) {
        return res.status(400).json({
          message:
            validation.message,
        });
      }

      const removeImage =
        parseBoolean(
          req.body?.removeImage,
          false
        );

      if (removeImage === null) {
        return res.status(400).json({
          message:
            "Remove image value is invalid",
        });
      }

      let imageUrl =
        current.imageUrl;

      let imagePublicId =
        current.imagePublicId;

      if (req.file) {
        const uploadResult =
          await uploadBurgerImage(
            req.file.buffer
          );

        uploadedImage = {
          secureUrl:
            uploadResult.secure_url,
          publicId:
            uploadResult.public_id,
        };

        imageUrl =
          uploadedImage.secureUrl;

        imagePublicId =
          uploadedImage.publicId;
      } else if (removeImage) {
        imageUrl = null;
        imagePublicId = null;
      }

      const {
        name,
        description,
        price,
        category,
        isAvailable,
        isFeatured,
      } = validation.data;

      const updateResult =
        await pool.query(
          `
            UPDATE burgers
            SET
              name = $1,
              description = $2,
              price = $3,
              image_url = $4,
              image_public_id = $5,
              category = $6,
              is_available = $7,
              is_featured = $8
            WHERE id = $9
            RETURNING
              id,
              name,
              description,
              price::TEXT AS price,
              image_url AS "imageUrl",
              image_public_id AS "imagePublicId",
              category,
              is_available AS "isAvailable",
              is_featured AS "isFeatured"
          `,
          [
            name,
            description,
            price,
            imageUrl,
            imagePublicId,
            category,
            isAvailable,
            isFeatured,
            burgerId,
          ]
        );

      const oldImageChanged =
        current.imagePublicId &&
        (uploadedImage ||
          removeImage);

      if (oldImageChanged) {
        await deleteBurgerImage(
          current.imagePublicId!
        ).catch((deleteError) => {
          console.error(
            "Delete old Cloudinary image error:",
            deleteError
          );
        });
      }

      return res.status(200).json({
        message:
          "Menu item updated successfully",
        burger:
          updateResult.rows[0],
      });
    } catch (error) {
      if (uploadedImage) {
        await deleteBurgerImage(
          uploadedImage.publicId
        ).catch((cleanupError) => {
          console.error(
            "Cloudinary cleanup error:",
            cleanupError
          );
        });
      }

      console.error(
        "Update burger error:",
        error
      );

      return res.status(500).json({
        message:
          "Unable to update the menu item",
      });
    }
  }
);

router.delete(
  "/:id",
  requireAdmin,
  async (req, res) => {
    try {
      const burgerId = parseBurgerId(
        req.params.id
      );

      if (!burgerId) {
        return res.status(400).json({
          message:
            "Burger ID is invalid",
        });
      }

      const result = await pool.query(
        `
          DELETE FROM burgers
          WHERE id = $1
          RETURNING
            id,
            image_public_id AS "imagePublicId"
        `,
        [burgerId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message:
            "Menu item not found",
        });
      }

      const imagePublicId =
        result.rows[0]
          .imagePublicId as
          | string
          | null;

      if (imagePublicId) {
        await deleteBurgerImage(
          imagePublicId
        ).catch((deleteError) => {
          console.error(
            "Delete Cloudinary image error:",
            deleteError
          );
        });
      }

      return res.status(200).json({
        message:
          "Menu item deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete burger error:",
        error
      );

      return res.status(500).json({
        message:
          "Unable to delete the menu item",
      });
    }
  }
);

export default router;