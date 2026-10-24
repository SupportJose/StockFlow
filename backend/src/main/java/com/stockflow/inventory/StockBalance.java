package com.stockflow.inventory;
import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal; import java.util.UUID;
@Entity @Table(name="stock_balance", uniqueConstraints=@UniqueConstraint(columnNames={"company_id","location_id","product_variant_id","lot_key"})) @Getter @NoArgsConstructor
public class StockBalance { @Id private UUID id; @Column(name="company_id",nullable=false) private UUID companyId; @Column(name="location_id",nullable=false) private UUID locationId; @Column(name="product_variant_id",nullable=false) private UUID variantId; @Column(name="lot_key",nullable=false) private String lotKey="-"; @Column(nullable=false,precision=19,scale=6) private BigDecimal onHand=BigDecimal.ZERO; @Column(nullable=false,precision=19,scale=6) private BigDecimal reserved=BigDecimal.ZERO; @Version private long version;
 public StockBalance(UUID c,UUID l,UUID v,String lot){id=UUID.randomUUID();companyId=c;locationId=l;variantId=v;lotKey=lot==null?"-":lot;}
 public void receive(BigDecimal q){ requirePositive(q); onHand=onHand.add(q); }
 public void issue(BigDecimal q){ requirePositive(q); if(onHand.subtract(reserved).compareTo(q)<0) throw new IllegalStateException("INSUFFICIENT_AVAILABLE_STOCK"); onHand=onHand.subtract(q); }
 public BigDecimal available(){return onHand.subtract(reserved);} private static void requirePositive(BigDecimal q){if(q==null||q.signum()<=0)throw new IllegalArgumentException("quantity must be positive");}}
