1. non_usa_customers.sql: Provide a query showing Customers (just their full names, customer ID and country) who are not in the US.
2. brazil_customers.sql: Provide a query only showing the Customers from Brazil.
3. brazil_customers_invoices.sql: Provide a query showing the Invoices of customers who are from Brazil. The resultant table should show the customer's full name, Invoice ID, Date of the invoice and billing country.
4. sales_agents.sql: Provide a query showing only the Employees who are Sales Agents.
5. unique_invoice_countries.sql: Provide a query showing a unique/distinct list of billing countries from the Invoice table.
6. sales_agent_invoices.sql: Provide a query that shows the invoices associated with each sales agent. The resultant table should include the Sales Agent's full name.
7. invoice_totals.sql: Provide a query that shows the Invoice Total, Customer name, Country and Sale Agent name for all invoices and customers.
8. total_invoices_{year}.sql: How many Invoices were there in 2009 and 2011?
9. total_sales_{year}.sql: What are the respective total sales for each of those years?
10. invoice_37_line_item_count.sql: Looking at the InvoiceLine table, provide a query that COUNTs the number of line items for Invoice ID 37.
11. line_items_per_invoice.sql: Looking at the InvoiceLine table, provide a query that COUNTs the number of line items for each Invoice. HINT: GROUP BY
12. line_item_track.sql: Provide a query that includes the purchased track name with each invoice line item.
13. line_item_track_artist.sql: Provide a query that includes the purchased track name AND artist name with each invoice line item.
14. country_invoices.sql: Provide a query that shows the # of invoices per country. HINT: GROUP BY
15. playlists_track_count.sql: Provide a query that shows the total number of tracks in each playlist. The Playlist name should be include on the resulant table.
16. tracks_no_id.sql: Provide a query that shows all the Tracks, but displays no IDs. The result should include the Album name, Media type and Genre.
17. invoices_line_item_count.sql: Provide a query that shows all Invoices but includes the # of invoice line items.
18. sales_agent_total_sales.sql: Provide a query that shows total sales made by each sales agent.
19. top_2009_agent.sql: Which sales agent made the most in sales in 2009?
    Hint: Use the MAX function on a subquery. 
20. top_agent.sql: Which sales agent made the most in sales over all?
21. sales_agent_customer_count.sql: Provide a query that shows the count of customers assigned to each sales agent.
22. sales_per_country.sql: Provide a query that shows the total sales per country.
23. top_country.sql: Which country's customers spent the most?
24. top_2013_track.sql: Provide a query that shows the most purchased track of 2013.
25. top_5_tracks.sql: Provide a query that shows the top 5 most purchased songs.
26. top_3_artists.sql: Provide a query that shows the top 3 best selling artists.
27. top_media_type.sql: Provide a query that shows the most purchased Media Type.


1. non_usa_customers.sql: 미국에 거주하지 않는 고객(전체 이름, 고객 ID 및 국가)을 표시하는 쿼리를 제공합니다.
2. brazil_customers.sql: 브라질 고객만 표시하는 쿼리를 제공합니다.
3. brazil_customers_invoices.sql: 브라질 고객의 송장을 보여주는 쿼리를 제공합니다. 결과 테이블에는 고객의 전체 이름, 송장 ID, 송장 날짜 및 청구 국가가 표시되어야 합니다.
4. sales_agents.sql: 판매 대리인인 직원만 표시하는 쿼리를 제공하십시오.
5. unique_invoice_countries.sql: 송장 테이블에서 청구 국가의 고유(unique)/고유(distinct) 목록을 표시하는 쿼리를 제공합니다.
6. sales_agent_invoices.sql: 각 판매 에이전트와 연결된 송장을 표시하는 쿼리를 제공합니다. 결과 테이블에는 영업 에이전트의 전체 이름이 포함되어야 합니다.
7. invoice_totals.sql: 모든 송장 및 고객에 대한 송장 합계, 고객 이름, 국가 및 판매 대리점 이름을 표시하는 쿼리를 제공합니다.
8. total_invoices_{year}.sql: 2009년과 2011년에 몇 개의 인보이스가 있었습니까?
9. total_sales_{year}.sql: 각 연도의 총 매출은 얼마입니까?
10. invoice_37_line_item_count.sql: InvoiceLine 테이블을 보고 Invoice ID 37에 대한 라인 항목 수를 계산하는 쿼리를 제공합니다.
11. line_items_per_invoice.sql: InvoiceLine 테이블을 보고 각 Invoice에 대한 라인 항목 수를 계산하는 쿼리를 제공합니다. 힌트: 그룹화 기준
12. line_item_track.sql: 각 송장 라인 항목에 구매한 트랙 이름을 포함하는 쿼리를 제공합니다.
13. line_item_track_artist.sql: 구매한 트랙 이름과 아티스트 이름을 포함하는 쿼리를 각 송장 라인 항목과 함께 제공합니다.
14. country_invoices.sql: 국가별 송장 수를 표시하는 쿼리를 제공합니다. 힌트: 그룹화 기준
15. playlists_track_count.sql: 각 재생 목록의 총 트랙 수를 표시하는 쿼리를 제공합니다. 재생 목록 이름은 결과 테이블에 포함되어야 합니다.
16. Tracks_no_id.sql: 모든 트랙을 표시하지만 ID는 표시하지 않는 쿼리를 제공합니다. 결과에는 앨범 이름, 미디어 유형 및 장르가 포함되어야 합니다.
17. invoices_line_item_count.sql: 모든 송장을 표시하지만 송장 라인 항목의 수를 포함하는 쿼리를 제공합니다.
18. sales_agent_total_sales.sql: 판매 대리점별 총 매출을 조회하는 쿼리를 제공한다.
19. top_2009_agent.sql: 2009년 가장 많은 매출을 올린 판매원은?
    힌트: 하위 쿼리에서 MAX 함수를 사용하십시오. 
20. top_agent.sql: 전체 판매 실적이 가장 많은 판매 대리점은?
21. sales_agent_customer_count.sql: 각 판매 대리점에 할당된 고객 수를 보여주는 쿼리를 제공한다.
22. sales_per_country.sql: 국가별 총 매출을 보여주는 쿼리를 제공한다.
23. top_country.sql: 고객이 가장 많이 지출한 국가는 어디입니까?
24. top_2013_track.sql: 2013년 가장 많이 구매한 트랙을 보여주는 쿼리를 제공합니다.
25. top_5_tracks.sql: 가장 많이 구매한 상위 5곡을 보여주는 쿼리를 제공합니다.
26. top_3_artists.sql: 가장 많이 팔린 3명의 아티스트를 보여주는 쿼리를 제공합니다.
27. top_media_type.sql: 가장 많이 구매한 Media Type을 보여주는 쿼리를 제공한다.