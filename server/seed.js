const mongoose = require("mongoose");
const Song = require("./models/song");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://melodia:AH90XFs9xABUhlIi@melodia.woowq8n.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch((err) => console.error("Connection error:", err));

const sampleSongs = [
  {
    title: "Luther",
    artist: "Kendrick Lamar & SZA",
    image:
      "https://i1.sndcdn.com/artworks-y6WaHzlvp7PbwkLT-JlZicw-t500x500.png",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751612924/Kendrick_Lamar_-_luther_Spider-Verse_e8oehi.mp3",
    genre: "hip-hop",
    mood: "intense",
    duration: 210,
    releaseDate: new Date("2025-06-01"),
    trendingScore: 98,
  },
  {
    title: "Die With a Smile",
    artist: "Lady Gaga & Bruno Mars",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVHYXtm6qFO-wc7bCDDKfe2I1BlLEap1y3mQ&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613145/Lady_Gaga_Bruno_Mars_-_Die_With_A_Smile_Official_Music_Video_kPa7bsKwL-c_mb4xqz.mp3",
    genre: "pop",
    mood: "romantic",
    duration: 195,
    releaseDate: new Date("2025-05-15"),
    trendingScore: 96,
  },
  {
    title: "Not Like Us",
    artist: "Kendrick Lamar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKhVmdXl7HMpNew_ukSnW1J-AHuKL9ttXxCg&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613248/Kendrick_Lamar_-_Not_Like_Us_H58vbez_m4E_fshd5l.mp3",
    genre: "hip-hop",
    mood: "aggressive",
    duration: 225,
    releaseDate: new Date("2025-06-10"),
    trendingScore: 94,
  },
  {
    title: "Apt.",
    artist: "ROSÉ & Bruno Mars",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6eZuiuDjY0As3mmPTSvaJP1lcrTsqoe5XfA&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613356/ROS%C3%89_Bruno_Mars_-_APT._Official_Lyric_Video_8Ebqe2Dbzls_1_lu47pb.mp3",
    genre: "pop",
    mood: "upbeat",
    duration: 180,
    releaseDate: new Date("2025-06-05"),
    trendingScore: 92,
  },
  {
    title: "Birds Of A Feather",
    artist: "Billie Eilish",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQen_BB6_1o2HFzxDIqYkjDHkQSAgsZmW12Qw&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613437/Billie_Eilish_-_BIRDS_OF_A_FEATHER_Official_Music_Video_V9PVRfjEBTI_yzbbxx.mp3",
    genre: "alternative",
    mood: "emotional",
    duration: 200,
    releaseDate: new Date("2025-05-20"),
    trendingScore: 90,
  },
  {
    title: "Nokia",
    artist: "Drake",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFO7SH_Xoll3n-4Mv65rd-4YsMSuQIygM84A&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613529/Drake_-_NOKIA_Official_Music_Video_8ekJMC8OtGU_lykqbd.mp3",
    genre: "rap",
    mood: "confident",
    duration: 215,
    releaseDate: new Date("2025-06-15"),
    trendingScore: 88,
  },
  {
    title: "DTMF",
    artist: "Bad Bunny",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiqlP4JTrpKgj_AOGM9cTlyJLECrbv9OajMA&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613609/Bad_Bunny_-_DtMF___Reggaeton___NCS_Fanmade_An8SyHe9CyQ_slwl5g.mp3",
    genre: "reggaeton",
    mood: "festive",
    duration: 230,
    releaseDate: new Date("2025-05-25"),
    trendingScore: 91,
  },
  {
    title: "A Bar Song (Tipsy)",
    artist: "Shaboozey",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivYgM412zi8r36MWVvCC_7gS6FG6BJAdCEQ&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613711/Shaboozey_-_A_Bar_Song_Tipsy_Official_Visualizer_t7bQwwqW-Hc_p7c9z6.mp3",
    genre: "country-rap",
    mood: "fun",
    duration: 185,
    releaseDate: new Date("2025-06-01"),
    trendingScore: 89,
  },
  {
    title: "Lose Control",
    artist: "Teddy Swims",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTysIhH41RDlV9LKs4jUytzvLlGHVkzwbOnng&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613787/Teddy_Swims_-_Lose_Control_The_Village_Sessions_9gWIIIr2Asw_kvifzd.mp3",
    genre: "r&b",
    mood: "passionate",
    duration: 190,
    releaseDate: new Date("2025-05-10"),
    trendingScore: 87,
  },
  {
    title: "Espresso",
    artist: "Sabrina Carpenter",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdnZ2EKT3p7TTNn7h9XEmUb-LAASbwlisZA&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751613873/Sabrina_Carpenter_-_Espresso_eVli-tstM5E_1_dsvm1o.mp3",
    genre: "pop",
    mood: "playful",
    duration: 175,
    releaseDate: new Date("2025-04-15"),
    trendingScore: 93,
  },
  {
    title: "Beautiful Things",
    artist: "Benson Boone",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVuwjUoHY1AeJXYaS5uoQAWNDK_MwDqBtjgQ&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751614674/Benson_Boone_-_Beautiful_Things_Live_from_the_67th_GRAMMY_Awards_fCWvZisydrE_1_rhjjfe.mp3",
    genre: "pop",
    mood: "heartwarming",
    duration: 200,
    releaseDate: new Date("2025-05-01"),
    trendingScore: 85,
  },
  {
    title: "Timeless",
    artist: "The Weeknd & Playboi Carti",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ16eZwCI_doWZcPb-vB0nfJ1fZli8DhoXAGg&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751614754/The_Weeknd_Playboi_Carti_-_Timeless_5EpyN_6dqyk_limrm3.mp3",
    genre: "r&b",
    mood: "mysterious",
    duration: 220,
    releaseDate: new Date("2025-06-20"),
    trendingScore: 83,
  },
  {
    title: "Midnight Sky",
    artist: "Miley Cyrus",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1bGR6L06Zu802_LBIzGyld1Uj1xDpx5PNg&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751614846/Miley_Cyrus_-_Midnight_Sky_Official_Video_aS1no1myeTM_blgajc.mp3",
    genre: "pop-rock",
    mood: "empowering",
    duration: 204,
    releaseDate: new Date("2025-06-12"),
    trendingScore: 88,
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUSanqMLiJmLO7U_z7KNjPjEa2KAW-RWUb6A&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751614911/Dua_Lipa_-_Levitating_Featuring_DaBaby_Official_Music_Video_TUVcZfQe-Kw_l4wsha.mp3",
    genre: "pop",
    mood: "uplifting",
    duration: 205,
    releaseDate: new Date("2025-05-05"),
    trendingScore: 87,
  },
  {
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvQJbI8MyGBPJfqS3atn8BZ3zKPS0x9hcTQ&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751614911/Dua_Lipa_-_Levitating_Featuring_DaBaby_Official_Music_Video_TUVcZfQe-Kw_l4wsha.mp3",
    genre: "pop-punk",
    mood: "angry",
    duration: 180,
    releaseDate: new Date("2025-04-25"),
    trendingScore: 90,
  },
  {
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqoJqJ7aIbDQqTqHh9oncbmdVv3N06rjCRfw&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751615059/The_Kid_LAROI_Justin_Bieber_-_STAY_Official_Video_kTJczUoc26U_1_vwsxzq.mp3",
    genre: "pop",
    mood: "emotional",
    duration: 190,
    releaseDate: new Date("2025-05-15"),
    trendingScore: 91,
  },
  {
    title: "Peaches",
    artist: "Justin Bieber ft. Daniel Caesar & Giveon",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGzjnI3IWks3yG1aEpKRxsilLMz-rqLj9acg&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751615129/Justin_Bieber_-_Peaches_ft._Daniel_Caesar_Giveon___Cover_by_PIXY_AOORA_U7-G6zxhLt8_aldqdr.mp3",
    genre: "r&b",
    mood: "smooth",
    duration: 200,
    releaseDate: new Date("2025-06-05"),
    trendingScore: 88,
  },
  {
    title: "drivers license",
    artist: "Olivia Rodrigo",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk38yy1W73AvXf0-fYLURKVP_Ojr64KSWJ9g&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751615202/Olivia_Rodrigo_-_drivers_license_64th_GRAMMY_Awards_Performance_x4drP6Q6p30_1_ffpd4e.mp3",
    genre: "pop",
    mood: "heartbroken",
    duration: 245,
    releaseDate: new Date("2025-05-10"),
    trendingScore: 92,
  },
  {
    title: "Adore You",
    artist: "Harry Styles",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvyIyUk0AwEhSeudAlI1lWAyzm_Xm_2CW-3A&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751615282/Harry_Styles_-_Adore_You_except_VKs953wjGPo_1_lzvpsg.mp3",
    genre: "pop",
    mood: "romantic",
    duration: 200,
    releaseDate: new Date("2025-05-20"),
    trendingScore: 86,
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe6fvWOCBSMXrMTKbAIcxWvy7J8gxTlYP6Pg&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751615349/Ed_Sheeran_-_Shape_Of_You_dWTUU0djIaw_hg06pu.mp3",
    genre: "pop",
    mood: "upbeat",
    duration: 235,
    releaseDate: new Date("2025-04-10"),
    trendingScore: 88,
  },
  {
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjKsgvl6E4DyEm3mhYMmurPQohkluAHVzR3w&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751615349/Ed_Sheeran_-_Shape_Of_You_dWTUU0djIaw_hg06pu.mp3",
    genre: "pop",
    mood: "summery",
    duration: 180,
    releaseDate: new Date("2025-05-25"),
    trendingScore: 90,
  },

  {
    title: "Cry For Me",
    artist: "The Weeknd",
    image:
      "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751550682/images_9_lwddol.jpg",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751615532/The_Weeknd_-_Cry_For_Me_Official_Music_Video_bn8gP5N8hqM_zgkkww.mp3",
    genre: "r&b",
    mood: "sad",
    duration: 210,
    releaseDate: new Date("2025-05-25"),
    trendingScore: 84,
  },
  {
    title: "Ordinary",
    artist: "Alex Warren",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIgfjhqbpva6nbL14ZY9y3y3JXJQsfXJmaiA&s",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751615597/Alex_Warren_-_Ordinary_Official_Video_u2ah9tWTkmk_amyxye.mp3",
    genre: "pop",
    mood: "reflective",
    duration: 195,
    releaseDate: new Date("2025-06-15"),
    trendingScore: 82,
  },
  {
    title: "ROXANNE",
    artist: "Arizona Zervas",
    image: "https://i.ytimg.com/vi/16YnOUnbE6s/maxresdefault.jpg",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797180/Arizona_Zervas_-_ROXANNE_Official_Video_suqrsw.mp3",
    genre: "hip-hop",
    mood: "energetic",
    duration: 168,
    releaseDate: new Date("2019-10-10"),
    trendingScore: 88,
  },
  {
    title: "Eastside",
    artist: "benny blanco, Halsey & Khalid",
    image: "https://i.scdn.co/image/ab67616d0000b273693dbf001d5b2d06ad9e5f4d",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797228/benny_blanco_Halsey_Khalid_Eastside_official_video_ykdvhz.mp3",
    genre: "pop",
    mood: "romantic",
    duration: 161,
    releaseDate: new Date("2018-07-13"),
    trendingScore: 90,
  },
  {
    title: "Payday",
    artist: "Doja Cat ft. Young Thug",
    image: "https://i.ytimg.com/vi/Qn8v3si_mDI/maxresdefault.jpg",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797288/Doja_Cat_-_Payday_Lyrics_ft._Young_Thug_fggurd.mp3",
    genre: "rap-pop",
    mood: "carefree",
    duration: 182,
    releaseDate: new Date("2021-06-25"),
    trendingScore: 85,
  },
  {
    title: "Heat Waves",
    artist: "Glass Animals",
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/b0/Glass_Animals_-_Heat_Waves.png",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797358/Glass_Animals_-_Heat_Waves_Official_Video_riqzg5.mp3",
    genre: "alternative",
    mood: "nostalgic",
    duration: 238,
    releaseDate: new Date("2020-06-29"),
    trendingScore: 92,
  },
  {
    title: "Fast",
    artist: "Juice WRLD",
    image: "https://i.ytimg.com/vi/lzQpS1rH3zI/maxresdefault.jpg",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797404/Juice_WRLD_-_Fast_bkvtnu.mp3",
    genre: "emo-rap",
    mood: "introspective",
    duration: 196,
    releaseDate: new Date("2019-03-08"),
    trendingScore: 89,
  },
  {
    title: "Somebody",
    artist: "Justin Bieber",
    image: "https://i.ytimg.com/vi/jLQrk6rmX6w/maxresdefault.jpg",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797460/Justin_Bieber_-_Somebody_Visualizer_yt14yo.mp3",
    genre: "pop",
    mood: "uplifting",
    duration: 190,
    releaseDate: new Date("2021-03-19"),
    trendingScore: 84,
  },
  {
    title: "Better",
    artist: "Khalid",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Better_Khalid_Single_Cover.png",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797511/Khalid_-_Better_Official_Video_iidie3.mp3",
    genre: "r&b",
    mood: "chill",
    duration: 210,
    releaseDate: new Date("2018-09-14"),
    trendingScore: 86,
  },
  {
    title: "THATS WHAT I WANT",
    artist: "Lil Nas X",
    image: "https://i.ytimg.com/vi/zHd4rSpZn48/hqdefault.jpg",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797547/Lil_Nas_X_-_THATS_WHAT_I_WANT_Lyrics_jmfefm.mp3",
    genre: "pop-rap",
    mood: "longing",
    duration: 155,
    releaseDate: new Date("2021-09-17"),
    trendingScore: 88,
  },
  {
    title: "Self Love",
    artist: "Metro Boomin & Coi Leray",
    image: "https://i.scdn.co/image/ab67616d0000b2736ed9aef791159496b286179f",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797586/Metro_Boomin_Coi_Leray_-_Self_Love_Spider-Man__Across_the_Spider-Verse_rbjjbg.mp3",
    genre: "hip-hop",
    mood: "motivational",
    duration: 170,
    releaseDate: new Date("2023-06-02"),
    trendingScore: 87,
  },
  {
    title: "BZRP Music Sessions #52",
    artist: "QUEVEDO",
    image: "https://i.ytimg.com/vi/A_g3lMcWVy0/maxresdefault.jpg",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797652/QUEVEDO_BZRP_Music_Sessions_52_l0tobr.mp3",
    genre: "latin",
    mood: "intense",
    duration: 184,
    releaseDate: new Date("2022-07-06"),
    trendingScore: 91,
  },
  {
    title: "Save Your Tears (Live)",
    artist: "The Weeknd",
    image: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797705/The_Weeknd_-_The_Weeknd_Save_Your_Tears_Live_on_The_2021_Billboard_Music_Awards_lpufir.mp3",
    genre: "synth-pop",
    mood: "emotional",
    duration: 239,
    releaseDate: new Date("2021-05-23"),
    trendingScore: 85,
  },
  {
    title: "oops!",
    artist: "Yung Gravy",
    image:
      "https://i1.sndcdn.com/artworks-bAfPcsHocjKYxJyT-hHx10Q-t500x500.jpg",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797732/Yung_Gravy_-_oops_Official_Video_aizu2n.mp3",
    genre: "comedy rap",
    mood: "playful",
    duration: 142,
    releaseDate: new Date("2020-10-01"),
    trendingScore: 83,
  },
  {
    title: "blue",
    artist: "yung kai",
    image: "https://upload.wikimedia.org/wikipedia/en/7/72/Yung_Kai_-_Blue.png",
    audio:
      "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751797761/yung_kai_-_blue_official_music_video_xcg5ya.mp3",
    genre: "lo-fi hip-hop",
    mood: "melancholic",
    duration: 221,
    releaseDate: new Date("2022-08-19"),
    trendingScore: 79,
  },
  {
    title: "Sapphire",
    artist: "Ed Sheeran",
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751798032/download_b9ghe9.jpg",
    audio: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751798208/Ed_Sheeran_-_Sapphire_Official_Music_Video_JgDNFQ2RaLQ_wfpt1x.mp3",
    genre: "pop",
    mood: "romantic",
    duration: 210,
    releaseDate: new Date("2025-05-15"),
    trendingScore: 92,
  },
  {
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    image: "https://res.cloudinary.com/dbgueh6q5/image/upload/v1751798322/download_3_wja5jw.jpg",
    audio: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751798434/Ed_Sheeran_-_Thinking_Out_Loud_Official_Music_Video_lp-EO5I60KA_f7vbvj.mp3",
    genre: "pop",
    mood: "slow dance",
    duration: 240,
    releaseDate: new Date("2025-05-01"),
    trendingScore: 95,
  },
  {
    title: "Enchanted (Taylor’s Version)",
    artist: "Taylor Swift",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg5-NuV4El1uLU2dwhgwSpsfuDMdLx4Wf-zQ&s",
    audio: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751798586/Enchanted_Taylor_s_Version_7IID5YLPg7w_f5lfyj.mp3",
    genre: "country-pop",
    mood: "magical",
    duration: 300,
    releaseDate: new Date("2025-06-10"),
    trendingScore: 94,
  },
  {
    title: "When We Were Young",
    artist: "Adele",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfAPJ9nu59P351wmUf9-jrsaMnl2y7slkGwg&s",
    audio: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751798735/When_We_Were_Young_a1IuJLebHgM_ssbuen.mp3",
    genre: "soul",
    mood: "nostalgic",
    duration: 290,
    releaseDate: new Date("2025-03-25"),
    trendingScore: 91,
  },
  {
    title: "Little Do You Know (Cover)",
    artist: "Sapphire & Alex Aiono",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfDsdtjTQGOTqQrMk6ihNm-UT1u54HCuK9OA&s",
    audio: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751798966/Alex_Sierra_-_Little_Do_You_Know_Annie_LeBlanc_Hayden_Summerall_Cover_Q7HgEjc_lXI_xtlh5l.mp3",
    genre: "acoustic",
    mood: "sad",
    duration: 200,
    releaseDate: new Date("2025-04-05"),
    trendingScore: 89,
  },
  {
    title: "Sign of the Times",
    artist: "Harry Styles",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYBBol2Te-EDbYzlzldmHkqjdLP_LxGSvieg&s",
    audio: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751799226/Harry_Styles_-_Sign_of_the_Times_Lyrics_We4QQCMwyrg_qwezul.mp3",
    genre: "rock",
    mood: "melancholy",
    duration: 260,
    releaseDate: new Date("2025-02-18"),
    trendingScore: 90,
  },
  {
    title: "Ocean Eyes",
    artist: "Billie Eilish",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPwqlm-cbhuKisOGFEYBmrV6ZknjpTKDARxw&s",
    audio: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751799467/Billie_Eilish_-_Ocean_Eyes_Lyrics_HQitbbtPZz8_wmbrxn.mp3",
    genre: "indie-pop",
    mood: "dreamy",
    duration: 195,
    releaseDate: new Date("2025-06-05"),
    trendingScore: 88,
  },
  {
    title: "Eyes Closed",
    artist: "Ed Sheeran",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv4Cb1dhmiMsQFhmrQ34V5d8IskP8Oi1LVmQ&s",
    audio: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751799653/Ed_Sheeran_-_Eyes_Closed_lzomiJ3mZXY_dx4u8k.mp3",
    genre: "pop",
    mood: "romantic",
    duration: 205,
    releaseDate: new Date("2024-09-18"),
    trendingScore: 93,
  },
  {
    title: "Love Story (Taylor’s Version)",
    artist: "Taylor Swift",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5id67RuMdU1ozFBPtTFIGqQOs1swpx_wgTQ&s",
    audio: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751799771/Taylor_Swift_-_Love_Story_Lyrics_KrsqPE9SMxo_itbrq8.mp3",
    genre: "country",
    mood: "romantic",
    duration: 230,
    releaseDate: new Date("2025-02-14"),
    trendingScore: 94,
  },
  {
    title: "As it Was",
    artist: "Harry Styles",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0gev-rxJJxlWyVi5TXgQZR7JZCUYz5OVBQw&s",
    audio: "https://res.cloudinary.com/dbgueh6q5/video/upload/v1751799972/As_It_Was_-_Harry_Styles_Lyrics_koN8PL5vTYg_ype8dq.mp3",
    genre: "pop",
    mood: "relaxed",
    duration: 230,
    releaseDate: new Date("2024-09-20"),
    trendingScore: 94,
  },
];

async function seedDatabase() {
  try {
    await Song.deleteMany();
    await Song.insertMany(sampleSongs);
    console.log("Database seeded with sample songs");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
}

seedDatabase();
