import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import all_env from "../../config/dotenv";

interface S3Config {
  bucketName: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  basePath?: string; // optional default path prefix
}

class S3Service {
  private s3Client: S3Client;
  private bucketName: string;
  private basePath: string;
  private region: string;

  constructor(config: S3Config) {
    this.bucketName = config.bucketName;
    this.basePath = config.basePath || "";
    this.region = config.region || "";
    this.s3Client = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  async listObjects(prefix: string = this.basePath) {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: prefix,
    });

    const result = await this.s3Client.send(command);
    return result;
  }

  async deleteObject(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const result = await this.s3Client.send(command);
    return result;
  }

  async getSignedGetUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: `${this.basePath}${key}`,
    });

    const url = await getSignedUrl(this.s3Client, command);
    return url;
  }


   async getPublicUrl(key: string): Promise<string> {
  // If basePath exists, prepend it
  const fullKey = `${this.basePath}${key}`;
  return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fullKey}`;
 }

 async getSignedPutUrl(key: string, contentType?: string) {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (!contentType || !allowedTypes.includes(contentType)) {
    throw new Error(
      `Invalid content type. Only jpg, png, and pdf are allowed. Received: ${contentType}`
    );
  }

  const command = new PutObjectCommand({
    Bucket: this.bucketName,
    Key: `${this.basePath}${key}`,
    ContentType: contentType,
  });

  const url = await getSignedUrl(this.s3Client, command);
  return url;
}
}


export const s3Client1 = new S3Service({
  bucketName: all_env.S3_BUCKET_NAME,
  region: all_env.S3_REGION,
  accessKeyId: all_env.S3_ACCCESS_KEY,
  secretAccessKey: all_env.S3_SECRET_KEY,
  basePath: all_env.S3_BASE_PATH, // optional path
});