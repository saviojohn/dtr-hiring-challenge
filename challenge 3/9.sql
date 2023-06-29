select max(sum_column) as max_sum , subquery.business_id, subquery.business_name
from ( 
  select sum(amount) as sum_column , business.business_id, business.business_name
  from sales
  inner join business
  on business.business_id = sales.business_id
  where sales.created_time >= '2021-01-01' and sales.created_time <= '2021-01-31'
  group by business.business_id
  order by sum_column desc
  limit 1
) as subquery
group by subquery.business_id, subquery.business_name;

update business
set business_name = concat('KING_',business.business_name)