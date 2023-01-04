INSERT INTO department (department_name)
VALUES ("Horn Section"),
       ("Drums"),
       ("Bass"),
       ("Auxiliary Percussion"),
       ("Guitar"),
       ("Vocals");

INSERT INTO role (title, salary, department_id)
VALUES  ("Bass player", 35000, 3),
        ("Trombone Player", 45000, 1),
        ("Drummer", 55000, 2),
        ("Rhythm Guitarist", 60000, 5),
        ("Conga and Tambourine Player", 35000, 4),
        ("Lead Vocalist", 75000, 6),
        ("Saxophone Player", 50000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Christopher","Jones", 7, 2),
        ("Paul","Smith", 1, NULL),
        ("Lainey", "Edwards", 6, 2),
        ("Jeff", "Sykes", 3, 2),
        ("Mickey","Southpaw", 4, 2);

