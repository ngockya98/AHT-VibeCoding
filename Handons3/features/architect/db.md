Table relation_manager {
  id            uuid        [pk, default: `uuid_generate_v4()`]
  email         varchar(255) [not null, unique]
  name          varchar(255)
  avatar        varchar(255)
  company       varchar(255)
  password      varchar(255)
  ccid          varchar(50)
  status        varchar(20)  [default: 'active']
  created_at    timestamp    [not null, default: `now()`]
  updated_at    timestamp    [not null, default: `now()`]
  created_by    uuid
  updated_by    uuid
}

Table audit_log {
  id            uuid        [pk, default: `uuid_generate_v4()`]
  table_name    varchar(100) [not null]
  record_id     uuid         [not null]
  action        varchar(20)  [not null] // create, update, delete
  changed_data  jsonb
  changed_by    uuid
  changed_at    timestamp    [not null, default: `now()`]
}

Ref: relation_manager.created_by > relation_manager.id
Ref: relation_manager.updated_by > relation_manager.id