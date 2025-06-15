package com.example.todo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
public class S3Service implements FileStorageService {
    private final S3Client s3;
    private final String bucket;

    public S3Service(
            @Value("${aws.accessKey:dummy}") String accessKey,
            @Value("${aws.secretKey:dummy}") String secretKey,
            @Value("${aws.region:us-east-1}") String region,
            @Value("${aws.bucket:test-bucket}") String bucket) {
        this.s3 = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKey, secretKey)))
                .build();
        this.bucket = bucket;
    }

    @Override
    public String store(MultipartFile file) throws IOException {
        String key = java.util.UUID.randomUUID() + "-" + file.getOriginalFilename();
        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .contentType(file.getContentType())
                .build();
        s3.putObject(request, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        return "s3://" + bucket + "/" + key;
    }
}
