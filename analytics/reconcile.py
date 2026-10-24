"""Read-only ledger/balance reconciliation. Never mutates operational stock."""
from decimal import Decimal
def expected_balance(lines):
    total=Decimal("0")
    for line in lines:
        q=Decimal(str(line["quantity"]))
        total += q if line["direction"]=="IN" else -q
    return total
def reconcile(lines,cached):
    expected=expected_balance(lines); actual=Decimal(str(cached))
    return {"expected":str(expected),"cached":str(actual),"difference":str(expected-actual),"ok":expected==actual}
