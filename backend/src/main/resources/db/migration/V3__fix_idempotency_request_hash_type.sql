ALTER TABLE idempotency_record
    ALTER COLUMN request_hash TYPE varchar(64)
    USING trim(request_hash);
