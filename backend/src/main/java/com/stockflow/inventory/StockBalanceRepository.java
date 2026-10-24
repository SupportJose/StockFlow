package com.stockflow.inventory;
import org.springframework.data.jpa.repository.*; import jakarta.persistence.LockModeType; import java.util.*;
public interface StockBalanceRepository extends JpaRepository<StockBalance,UUID>{ @Lock(LockModeType.PESSIMISTIC_WRITE) @Query("select b from StockBalance b where b.companyId=:c and b.locationId=:l and b.variantId=:v and b.lotKey=:lot") Optional<StockBalance> lock(UUID c,UUID l,UUID v,String lot); List<StockBalance> findByCompanyId(UUID companyId); }
