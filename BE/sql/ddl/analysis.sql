create table analysis(
    id int auto_increment primary key not null,
    user_id binary(16) not null,
    start_date date not null,
    end_date date not null,
    result text not null
);