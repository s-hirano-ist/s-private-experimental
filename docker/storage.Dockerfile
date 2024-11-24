FROM minio/minio:RELEASE.2024-10-29T16-01-48Z@sha256:ebd2af76d40ff25ccc630533615f7ccd55fbe83d629a4b7c7a1b6311c1af3d6c
CMD ["server", "/data", "--console-address", ":9001"]
