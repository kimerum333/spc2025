-- Provide a query that shows the invoices associated with each sales agent. The resultant table should include the Sales Agent's full name.
SELECT
    e.firstname || ' ' || e.lastname as fullname,
    i.*
FROM
    employees as e
    INNER JOIN customers as c ON e.employeeid = c.supportrepid
    INNER JOIN invoices as i ON c.customerid = i.customerid
WHERE
    title LIKE '%Agent'
ORDER BY
    fullname
;