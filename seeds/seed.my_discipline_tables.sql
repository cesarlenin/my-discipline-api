BEGIN;

TRUNCATE
  my_discipline_habit,
  my_discipline_users,
  my_discipline_actions
  RESTART IDENTITY CASCADE;

INSERT INTO my_discipline_users (user_name, full_name, nickname, password)
VALUES
  ('dunder', 'Dunder Mifflin', null, '$2a$12$ulhTRXemH.aOPypChfQBveOdZEX9NDFFEcoEvaWAN0bL9w9rekmkq'),
  ('b.deboop', 'Bodeep Deboop', 'Bo', '$2a$12$IhQm5OFW83TQI0S4qFikLuI3Xi82xFMZTuegr5D1Uf8uo530UkJre'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie', '$2a$12$9Wk6PfleCMBmgfWeWc9Uc.faZcoF31A9MJSi.Ibja9uFUFey/eT.m'),
  ('s.smith', 'Sam Smith', 'Sam', '$2a$12$MPolTKFaXvbba08zj7LEc.ldLi.BaeNP6MHSoopAqYZBMi2Q8R5bG'),
  ('lexlor', 'Alex Taylor', 'Lex', '$2a$12$KJm4ChFd92glu/8HDStg8ujeKH5Nx93WikffVwvjzGJ70UL2HYWIu'),
  ('wippy', 'Ping Won In', 'Ping', '$2a$12$V.ySGrWrLADZk5N2fudmTepPCa8bohFRuXHmNeboblIttP78Kf2Fm');

INSERT INTO my_discipline_habit (habit_name, goal, user_id, description)
VALUES
  ('read a book', 1, 1, 'read a book for 10 mins everyday'),
  ('read a manga', 1, 2, '100% guaranteed to occasionally work every time! Requires a 167.23v power outlet or a dragonscale battery (obtained separately by solving a riddle).'),
  ('swim a mile', 3, 3, 'This convenient item can assist you in bringing your kangaroo to your favorite grocery store, or as a conversation starter at a first date or funeral.'),
  ('lift weights', 3, 4, 'While not as well known as its predecessor, Love Potion #9, this formulation has been proven to be effective in winning the affections of some small amphibians.'),
  ('bjj', 1, 5, 'With this freeze ray, you can stop the world.'),
  ('hike', 5, 6, 'With its guaranteed 10m radius, this discreet device will disable an entire busload of iPhones with the push of a button. It is recommended to include an analog camera which can record the entertaining looks on the faces of those affected, as well as a riot shield in case of mass hysteria.'),
  ('coding challenge', 4, 1, 'Purchase this pamphlet for $100. Sell this pamphlet to a billion people for $100. Acquisition of this pamphlet is indeed proof of foolishness!'),
  ('run a mile', 4, 2, 'Once installed by a qualified leprechaun, this spigot will produce a steady stream of stories which can be later be adapted to motion pictures which will not be quite as good as the originals.'),
  ('ride a motocycle', 2, 3, 'Get home quicker than either Uber or Lyft! Three taps of the heels is all it takes. One size fits all.'),
  ( 'eat healthy', 1, 4, 'May or may not produce a genie.');

INSERT INTO my_discipline_actions (bool, habit_id, user_id)
 VALUES
  (1,2),
  (1,3),
  (1,4),
  (1,5),
  (2,6),
  (2,1),
  (2,3),
  (4,6),
  (4,4),
  (10,3),
  (10,5),
  (7,1),
  (7,2),
  (7,3),
  (7,4),
  (9,6),
  (6,5),
  (6,1),
  (8,2),
  (8,4);

COMMIT;
