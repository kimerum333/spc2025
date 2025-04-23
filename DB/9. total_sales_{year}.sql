-- : What are the respective total sales for each of those years?
SELECT 
    STRFTIME('%Y',invoicedate) as Year,
    SUM(total) as total
FROM
    invoices
GROUP BY
    Year
;