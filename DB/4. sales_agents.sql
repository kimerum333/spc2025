-- 4. sales_agents.sql: Provide a query showing only the Employees who are Sales Agents.
SELECT
    *
FROM
    employees
WHERE
    title LIKE '%Agent'
;