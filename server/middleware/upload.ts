import type { RequestHandler } from "express";
import multer from "multer";

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },

  fileFilter: (
    req,
    file,
    callback
  ) => {
    if (
      !allowedImageTypes.has(
        file.mimetype
      )
    ) {
      callback(
        new Error(
          "Only PNG, JPG and WEBP images are allowed"
        )
      );
      return;
    }

    callback(null, true);
  },
});

export const handleBurgerImageUpload: RequestHandler =
  (req, res, next) => {
    upload.single("image")(
      req,
      res,
      (error) => {
        if (!error) {
          next();
          return;
        }

        if (
          error instanceof
          multer.MulterError
        ) {
          if (
            error.code ===
            "LIMIT_FILE_SIZE"
          ) {
            return res.status(400).json({
              message:
                "The image must be smaller than 5MB",
            });
          }

          return res.status(400).json({
            message:
              "The image upload is invalid",
          });
        }

        return res.status(400).json({
          message:
            error instanceof Error
              ? error.message
              : "Unable to upload the image",
        });
      }
    );
  };