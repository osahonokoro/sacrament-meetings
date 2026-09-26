-- Run in Vercel → Storage → your database → Query (or the Neon SQL editor).
-- Safe to re-run: the table is created only if missing, and rows with an
-- existing date are skipped.

CREATE TABLE IF NOT EXISTS meetings (
  id             SERIAL        PRIMARY KEY,
  date           DATE          NOT NULL UNIQUE,
  meeting_type   VARCHAR(20)   NOT NULL
                               CHECK (meeting_type IN
                                 ('testimony','regular','stake','general','special')),
  presiding      VARCHAR(255)  NOT NULL,
  conducting     VARCHAR(255)  NOT NULL,
  announcements  TEXT[]        DEFAULT '{}',
  opening_hymn   JSONB         NOT NULL,
  opening_prayer VARCHAR(255)  NOT NULL,
  ward_business  JSONB         DEFAULT '[]',
  stake_business BOOLEAN       DEFAULT false,
  sacrament_hymn JSONB         NOT NULL,
  speakers       JSONB         DEFAULT '[]',
  closing_hymn   JSONB         NOT NULL,
  closing_prayer VARCHAR(255)  NOT NULL
);

INSERT INTO meetings (
  date, meeting_type, presiding, conducting, announcements,
  opening_hymn, opening_prayer, ward_business, stake_business,
  sacrament_hymn, speakers, closing_hymn, closing_prayer
) VALUES
(
  '2026-08-02','testimony','Bishop Thompson','Brother Nakamura',
  ARRAY[]::TEXT[],
  '{"number":134,"title":"I Believe in Christ"}','Sister Park',
  '[]',false,
  '{"number":175,"title":"O God, the Eternal Father"}',
  '[]',
  '{"number":219,"title":"Because I Have Been Given Much"}','Brother Alvarez'
),(
  '2026-08-09','regular','Bishop Thompson','Brother Nakamura',
  ARRAY['Ward temple night: Aug 28'],
  '{"number":2,"title":"The Spirit of God"}','Sister Ramirez',
  '[{"description":"Sustaining of new Sunday School president"}]',true,
  '{"number":169,"title":"As Now We Take the Sacrament"}',
  '[{"name":"Sister Chen","topic":"The Sacrament","type":"speaker"},
    {"name":"Brother Osei","topic":"Covenant Keeping","type":"speaker"}]',
  '{"number":31,"title":"O God, Our Help in Ages Past"}','Brother Lewis'
),(
  '2026-08-16','regular','Bishop Thompson','Sister Torres',
  ARRAY['Ministering interviews this week'],
  '{"number":85,"title":"How Firm a Foundation"}','Brother Kim',
  '[{"description":"Release - Sister Martinez - Primary Teacher"},
    {"description":"Sustain - Sister Agbavor - Primary Teacher"},
    {"description":"Sustain - Sister Mukiwa - RS 2nd Counselor"}]',false,
  '{"number":173,"title":"While of These Emblems We Partake"}',
  '[{"name":"Sister Nakamura","topic":"Personal Revelation","type":"speaker"},
    {"name":"Youth Choir","topic":"","type":"musical-number"},
    {"name":"Brother Santos","topic":"Temple Covenants","type":"speaker"}]',
  '{"number":226,"title":"Improve the Shining Moments"}','Sister Jensen'
),(
  '2026-08-23','stake','President Gimenez','President Gimenez',
  ARRAY[]::TEXT[],
  '{"number":19,"title":"We Thank Thee, O God, for a Prophet"}','Sister Okafor',
  '[]',true,
  '{"number":193,"title":"I Stand All Amazed"}',
  '[{"name":"President Gimenez","topic":"Gathering Israel","type":"speaker"},
    {"name":"Stake Choir","topic":"","type":"musical-number"}]',
  '{"number":152,"title":"God Be with You Till We Meet Again"}','Brother Haddad'
),(
  '2026-09-06','testimony','Bishop Thompson','Brother Smith',
  ARRAY['Youth fireside Sep 13'],
  '{"number":3,"title":"Now Let Us Rejoice"}','Sister Adams',
  '[]',false,
  '{"number":194,"title":"There Is a Green Hill Far Away"}',
  '[]',
  '{"number":241,"title":"Count Your Blessings"}','Brother Miller'
),(
  '2026-09-13','regular','Bishop Thompson','Sister Torres',
  ARRAY['Blood drive Sep 19'],
  '{"number":5,"title":"High on the Mountain Top"}','Brother Lee',
  '[{"description":"Sustain - Brother Wright - Elders Quorum Secretary"}]',false,
  '{"number":187,"title":"God Loved Us, So He Sent His Son"}',
  '[{"name":"Sister Smith","topic":"Faith in Jesus Christ","type":"speaker"},
    {"name":"Brother Garcia","topic":"Service","type":"speaker"}]',
  '{"number":227,"title":"There Is Sunshine in My Soul Today"}','Sister Patel'
),(
  '2026-10-11','testimony','Bishop Thompson','Brother Nakamura',
  ARRAY[]::TEXT[],
  '{"number":1,"title":"The Morning Breaks"}','Brother Foster',
  '[]',false,
  '{"number":172,"title":"In Humility, Our Savior"}',
  '[]',
  '{"number":301,"title":"I Am a Child of God"}','Sister Ortega'
),(
  '2026-10-04','general','President Oaks','Elder Holland',
  ARRAY['No ward meetings: General Conference weekend'],
  '{"number":6,"title":"Redeemer of Israel"}','Elder Kearon',
  '[]',false,
  '{"number":181,"title":"Jesus of Nazareth, Savior and King"}',
  '[{"name":"President Oaks","topic":"Conference Address","type":"speaker"}]',
  '{"number":2,"title":"The Spirit of God"}','Sister Johnson'
),(
  '2026-09-20','special','Bishop Thompson','Brother Smith',
  ARRAY['Primary program today'],
  '{"number":304,"title":"Teach Me to Walk in the Light"}','Primary child',
  '[]',false,
  '{"number":188,"title":"Thy Will, O Lord, Be Done"}',
  '[{"name":"Primary Children","topic":"I Will Follow God''s Plan","type":"musical-number"}]',
  '{"number":2,"title":"The Spirit of God"}','Primary child'
),(
  '2026-09-27','regular','Bishop Thompson','Sister Torres',
  ARRAY['Ward trunk-or-treat Oct 30'],
  '{"number":27,"title":"Praise to the Man"}','Brother Osei',
  '[{"description":"Sustain - Sister Chen - Young Women President"}]',false,
  '{"number":170,"title":"God, Our Father, Hear Us Pray"}',
  '[{"name":"Brother Davis","topic":"Ministering","type":"speaker"},
    {"name":"Sister Kim","topic":"Prayer","type":"speaker"}]',
  '{"number":85,"title":"How Firm a Foundation"}','Sister Ramirez'
),(
  '2026-10-18','regular','Bishop Thompson','Brother Nakamura',
  ARRAY['Stake conference Nov 1'],
  '{"number":140,"title":"Did You Think to Pray?"}','Sister Park',
  '[]',true,
  '{"number":176,"title":"Tis Sweet to Sing the Matchless Love"}',
  '[{"name":"Sister Brown","topic":"Repentance","type":"speaker"},
    {"name":"Brother Smith","topic":"Missionary Work","type":"speaker"}]',
  '{"number":116,"title":"Come, Follow Me"}','Brother Alvarez'
)
ON CONFLICT (date) DO NOTHING;
