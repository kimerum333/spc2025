-- Provide a query that shows the Invoice Total, Customer name, Country and Sale Agent name for all invoices and customers.
SELECT
    COUNT(i.invoiceid) as InvoiceTotal,
    c.firstname || ' ' || c.lastname as CustomerName,
    c.country,
    e.firstname || ' ' || e.lastname as SalesAgentName
FROM
    invoices as i
    LEFT JOIN customers as c ON i.customerid = c.customerid
    LEFT JOIN employees as e ON c.supportrepid = e.employeeid AND e.title like '%Agent'
GROUP BY
    c.customerid
;