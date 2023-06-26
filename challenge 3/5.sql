SELECT business.business_id, business.business_name, sum(amount) AS total_amt
FROM sales
inner join business
on business.business_id = sales.business_id
GROUP BY business.business_id;