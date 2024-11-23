create table member(
    id int auto_increment primary key not null,
    email varchar(25),
    name varchar(25),
    role varchar(10),
    socialtype varchar(45),
    analysis_count int,
    last_analysis_date date
);