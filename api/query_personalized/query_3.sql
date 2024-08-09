select distinct nldb1.event_name, nldb1.key, nldb1.value
from translated_log_db nldb1
where key='DataSourceName' and NOT EXISTS(
    select * 
    from translated_log_db nldb2
    where nldb1.event_name=nldb2.event_name and ((nldb2.key='DataSourceType' and nldb2.value='Input') or (nldb2.key='DataSourceType' and nldb2.value='Both'))
)