INSERT INTO inventory_movement(id, company_id, type, reference_type, reference_id, posted_at, actor_id)
VALUES (
    '00000000-0000-0000-0000-000000000070',
    '00000000-0000-0000-0000-000000000001',
    'RECEIPT',
    'DEMO_SEED',
    '00000000-0000-0000-0000-000000000071',
    now(),
    '00000000-0000-0000-0000-000000000072'
);

INSERT INTO inventory_movement_line(id, movement_id, product_variant_id, location_id, quantity, unit_cost, lot_key)
VALUES (
    '00000000-0000-0000-0000-000000000073',
    '00000000-0000-0000-0000-000000000070',
    '00000000-0000-0000-0000-000000000060',
    '00000000-0000-0000-0000-000000000030',
    120,
    5.00,
    '-'
);

INSERT INTO stock_balance(id, company_id, location_id, product_variant_id, lot_key, on_hand, reserved, version)
VALUES (
    '00000000-0000-0000-0000-000000000074',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000030',
    '00000000-0000-0000-0000-000000000060',
    '-',
    120,
    0,
    0
);
