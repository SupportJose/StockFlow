package com.stockflow.inventory;

import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo")
@RequiredArgsConstructor
public class DemoInventoryController {
    private static final UUID DEMO_COMPANY_ID = UUID.fromString("00000000-0000-0000-0000-000000000001");

    private final StockBalanceRepository balances;

    @GetMapping("/balances")
    List<StockBalance> balances() {
        return balances.findByCompanyId(DEMO_COMPANY_ID);
    }
}
