-- 3. brazil_customers_invoices.sql: Provide a query showing the Invoices of customers who are from Brazil. The resultant table should show the customer's full name, Invoice ID, Date of the invoice and billing country.
SELECT
    c.firstname || ' ' || c.lastname as fullname, 
    i.invoiceid,
    i.invoicedate,
    i.billingcountry
FROM
    customers AS c
INNER JOIN
    invoices AS i ON i.customerid = c.customerid
WHERE
    c.country = 'Brazil'
;