const StorageConfig = () => ({
    projectId: process.env.PROJECT_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    mediaBucket: process.env.STORAGE_MEDIA_BUCKET,
    s3_access_key_id: process.env.S3_ACCESS_KEY_ID,
    s3_secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    s3_bucket: process.env.AWS_S3_BUCKET
});

export default StorageConfig;