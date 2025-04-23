-- 8. total_invoices_{year}.sql: How many Invoices were there in 2009 and 2011?
SELECT 
    COUNT(*)
FROM
    invoices
WHERE
    invoicedate BETWEEN '2009-01-01' AND '2011-12-31'
;