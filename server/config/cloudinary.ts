import "dotenv/config";

import {
  v2 as cloudinary,
  type UploadApiResponse,
} from "cloudinary";

let configured = false;

function configureCloudinary() {
  if (configured) {
    return;
  }

  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME;

  const apiKey =
    process.env.CLOUDINARY_API_KEY;

  const apiSecret =
    process.env.CLOUDINARY_API_SECRET;

  if (
    !cloudName ||
    !apiKey ||
    !apiSecret
  ) {
    throw new Error(
      "Cloudinary environment variables are not configured"
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  configured = true;
}

export async function uploadBurgerImage(
  buffer: Buffer
) {
  configureCloudinary();

  return new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder:
              "maya-burger/menu-items",
            resource_type: "image",
            use_filename: true,
            unique_filename: true,
            overwrite: false,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            if (!result) {
              reject(
                new Error(
                  "Cloudinary did not return an upload result"
                )
              );
              return;
            }

            resolve(result);
          }
        );

      uploadStream.end(buffer);
    }
  );
}

export async function deleteBurgerImage(
  publicId: string
) {
  configureCloudinary();

  return cloudinary.uploader.destroy(
    publicId,
    {
      resource_type: "image",
    }
  );
}