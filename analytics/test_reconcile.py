from reconcile import reconcile
def test_reconcile(): assert reconcile([{"quantity":"10.5","direction":"IN"},{"quantity":"2","direction":"OUT"}],"8.5")["ok"]
