const VOCAB_DATA = {
    "1": {
        "Unit 1: At School": [
            { "word": "pencil", "hint": "You use this to write in your exercise book.", "translations": { "cn": "铅笔", "ms": "pensel" }, "sentences": { "en": "I write with a sharp pencil.", "cn": "我用锋利的铅笔写字。", "ms": "Saya menulis dengan pensel yang tajam." } },
            { "word": "rubber", "hint": "You use this to erase your mistakes.", "translations": { "cn": "橡皮擦", "ms": "pemadam" }, "sentences": { "en": "Use a rubber to clean the paper.", "cn": "用橡皮擦擦干净纸张。", "ms": "Gunakan pemadam untuk membersihkan kertas itu." } },
            { "word": "notebook", "hint": "A small book where you write down your notes.", "translations": { "cn": "笔记本", "ms": "buku nota" }, "sentences": { "en": "I write my lessons in a notebook.", "cn": "我把课文写在笔记本上。", "ms": "Saya menulis pelajaran saya di dalam buku nota." } },
            { "word": "ruler", "hint": "You use this straight tool to draw lines.", "translations": { "cn": "尺", "ms": "pembaris" }, "sentences": { "en": "Draw a straight line with a ruler.", "cn": "用尺画一条直线。", "ms": "Lukis garisan lurus dengan pembaris." } },
            { "word": "chair", "hint": "A piece of furniture you sit on in class.", "translations": { "cn": "椅子", "ms": "kerusi" }, "sentences": { "en": "Sit down on your chair quietly.", "cn": "安静地坐在你的椅子上。", "ms": "Duduk di atas kerusi anda dengan senyap." } },
            { "word": "desk", "hint": "A table you sit at to do your schoolwork.", "translations": { "cn": "书桌", "ms": "meja tulis" }, "sentences": { "en": "Keep your desk tidy and clean.", "cn": "保持你的书桌整洁干净。", "ms": "Pastikan meja tulis anda kemas dan bersih." } },
            { "word": "pencilcase", "hint": "A small bag where you keep your stationery.", "translations": { "cn": "笔袋/铅笔盒", "ms": "kotak pensel" }, "sentences": { "en": "My pencilcase is full of pens.", "cn": "我的铅笔盒里装满了笔。", "ms": "Kotak pensel saya penuh dengan pen." } },
            { "word": "book", "hint": "You read stories or learn lessons from this.", "translations": { "cn": "书", "ms": "buku" }, "sentences": { "en": "This story book is very interesting.", "cn": "这本书很有趣。", "ms": "Buku cerita ini sangat menarik." } },
            { "word": "sharpener", "hint": "You use this when your pencil is blunt.", "translations": { "cn": "削笔刀/卷笔刀", "ms": "pengasah" }, "sentences": { "en": "I need a sharpener for my pencil.", "cn": "我需要一个削笔刀来削铅笔。", "ms": "Saya memerlukan pengasah untuk pensel saya." } },
            { "word": "bag", "hint": "You carry your school things in this.", "translations": { "cn": "书包/袋子", "ms": "beg" }, "sentences": { "en": "Put your books inside your school bag.", "cn": "把书放进你的书包里。", "ms": "Masukkan buku-buku anda ke dalam beg sekolah." } }
        ],
        "Unit 2: Let's Play!": [
            { "word": "kite", "hint": "A toy you fly in the sky when it is windy.", "translations": { "cn": "风筝", "ms": "wau/layang-layang" }, "sentences": { "en": "Flying a kite is fun in the park.", "cn": "在公园放风筝很有趣。", "ms": "Bermain layang-layang sangat menyeronokkan di taman." } },
            { "word": "train", "hint": "A long transport that moves on tracks.", "translations": { "cn": "火车", "ms": "keretapi" }, "sentences": { "en": "The train travels very fast.", "cn": "火车行驶得非常快。", "ms": "Keretapi itu bergerak sangat laju." } },
            { "word": "bike", "hint": "A two-wheeled vehicle you pedal.", "translations": { "cn": "自行车", "ms": "basikal" }, "sentences": { "en": "I ride my bike to school every day.", "cn": "我每天骑自行车上学。", "ms": "Saya menunggang basikal ke sekolah setiap hari." } },
            { "word": "doll", "hint": "A toy that looks like a baby or person.", "translations": { "cn": "娃娃", "ms": "anak patung" }, "sentences": { "en": "She plays with her favorite doll.", "cn": "她玩她最喜欢的娃娃。", "ms": "Dia bermain dengan anak patung kegemarannya." } },
            { "word": "monster", "hint": "A scary, imaginary creature.", "translations": { "cn": "怪物", "ms": "raksasa" }, "sentences": { "en": "The scary monster has green skin.", "cn": "那个可怕的怪物有绿色的皮肤。", "ms": "Raksasa yang menakutkan itu mempunyai kulit hijau." } },
            { "word": "plane", "hint": "A transport that flies high in the sky.", "translations": { "cn": "飞机", "ms": "kapal terbang" }, "sentences": { "en": "The plane is flying over the clouds.", "cn": "飞机正在云层上飞行。", "ms": "Kapal terbang itu sedang terbang di atas awan." } },
            { "word": "computer", "hint": "An electronic machine used for playing games or working.", "translations": { "cn": "电脑", "ms": "komputer" }, "sentences": { "en": "I play games on my computer.", "cn": "我在电脑上玩游戏。", "ms": "Saya bermain permainan di komputer saya." } },
            { "word": "ball", "hint": "A round toy you can kick or throw.", "translations": { "cn": "球", "ms": "bola" }, "sentences": { "en": "Kick the ball into the goal.", "cn": "把球踢进球门。", "ms": "Tendang bola itu ke dalam gol." } },
            { "word": "car", "hint": "A four-wheeled vehicle driven on the road.", "translations": { "cn": "汽车", "ms": "kereta" }, "sentences": { "en": "My father drives a red car.", "cn": "我父亲开一辆红色的车。", "ms": "Bapa saya memandu sebuah kereta merah." } },
            { "word": "gokart", "hint": "A small racing car without a roof.", "translations": { "cn": "卡丁车", "ms": "go-kart" }, "sentences": { "en": "Racing a go-kart is very exciting.", "cn": "开卡丁车比赛非常刺激。", "ms": "Berlumba go-kart sangat mengujakan." } }
        ],
        "Unit 3: Pet Show": [
            { "word": "spider", "hint": "A small animal with eight legs.", "translations": { "cn": "蜘蛛", "ms": "lelabah" }, "sentences": { "en": "The spider is spinning a large web.", "cn": "蜘蛛正在织一张大网。", "ms": "Lelabah itu sedang membina sarang yang besar." } },
            { "word": "lizard", "hint": "A reptile that can climb walls.", "translations": { "cn": "蜥蜴", "ms": "cicak" }, "sentences": { "en": "The lizard is sunning itself on the wall.", "cn": "蜥蜴正在墙上晒太阳。", "ms": "Cicak itu sedang berjemur di atas dinding." } },
            { "word": "elephant", "hint": "A very large grey animal with a long trunk.", "translations": { "cn": "大象", "ms": "gajah" }, "sentences": { "en": "An elephant is very strong and big.", "cn": "大象非常强壮且高大。", "ms": "Gajah adalah sangat kuat dan besar." } },
            { "word": "rabbit", "hint": "A furry animal with long ears that hops.", "translations": { "cn": "兔子", "ms": "arnab" }, "sentences": { "en": "The white rabbit likes to hop around.", "cn": "小白兔喜欢跳来跳去。", "ms": "Arnab putih itu suka melompat-lompat." } },
            { "word": "duck", "hint": "A bird that swims and quacks.", "translations": { "cn": "鸭子", "ms": "itik" }, "sentences": { "en": "The little duck is swimming in the pond.", "cn": "小鸭子在池塘里游泳。", "ms": "Anak itik itu sedang berenang di dalam kolam." } },
            { "word": "frog", "hint": "A green amphibian that jumps and croaks.", "translations": { "cn": "青蛙", "ms": "katak" }, "sentences": { "en": "The frog catches flies with its tongue.", "cn": "青蛙用舌头抓苍蝇。", "ms": "Katak itu menangkap lalat dengan lidahnya." } },
            { "word": "snake", "hint": "A long, thin reptile with no legs.", "translations": { "cn": "蛇", "ms": "ular" }, "sentences": { "en": "The snake is slithering through the grass.", "cn": "蛇在草丛中爬行。", "ms": "Ular itu sedang menyusur di dalam rumput." } },
            { "word": "cat", "hint": "A furry pet that meows.", "translations": { "cn": "猫", "ms": "kucing" }, "sentences": { "en": "The cat is sleeping on the mat.", "cn": "猫正睡在垫子上。", "ms": "Kucing itu sedang tidur di atas alas kaki." } },
            { "word": "dog", "hint": "A friendly pet that barks.", "translations": { "cn": "狗", "ms": "anjing" }, "sentences": { "en": "The dog is wagging its tail happily.", "cn": "狗开心地摇着尾巴。", "ms": "Anjing itu sedang menggerakkan ekornya dengan gembira." } },
            { "word": "rat", "hint": "A small animal with a long tail, similar to a mouse.", "translations": { "cn": "老鼠/大鼠", "ms": "tikus" }, "sentences": { "en": "The rat is scurrying across the floor.", "cn": "老鼠在地板上乱窜。", "ms": "Tikus itu sedang berlari melintas lantai." } }
        ],
        "Unit 4: Lunchtime": [
            { "word": "cheese", "hint": "A yellow dairy food that mice love.", "translations": { "cn": "奶酪", "ms": "keju" }, "sentences": { "en": "I like to put cheese on my pizza.", "cn": "我喜欢在比萨上放奶酪。", "ms": "Saya suka letak keju di atas piza saya." } },
            { "word": "chicken", "hint": "A farm bird that we often eat.", "translations": { "cn": "鸡肉", "ms": "ayam" }, "sentences": { "en": "Fried chicken is very popular and tasty.", "cn": "炸鸡非常受欢迎且美味。", "ms": "Ayam goreng sangat popular dan sedap." } },
            { "word": "apple", "hint": "A red or green fruit that keeps the doctor away.", "translations": { "cn": "苹果", "ms": "epal" }, "sentences": { "en": "I eat a fresh apple every afternoon.", "cn": "我每天下午吃一个新鲜的苹果。", "ms": "Saya makan sebiji epal segar setiap petang." } },
            { "word": "banana", "hint": "A long yellow fruit that monkeys love.", "translations": { "cn": "香蕉", "ms": "pisang" }, "sentences": { "en": "A banana is a healthy and sweet snack.", "cn": "香蕉是一种健康且甜美的零食。", "ms": "Pisang ialah snek yang sihat dan manis." } },
            { "word": "sandwich", "hint": "Food made with two slices of bread and filling inside.", "translations": { "cn": "三明治", "ms": "sandwic" }, "sentences": { "en": "I have a tuna sandwich for my lunch.", "cn": "我午餐吃金枪鱼三明治。", "ms": "Saya makan sandwic tuna untuk makan tengah hari." } },
            { "word": "sausage", "hint": "A long piece of meat, often eaten with breakfast.", "translations": { "cn": "香肠", "ms": "sosej" }, "sentences": { "en": "We are having sausages for breakfast today.", "cn": "我们今天早餐吃香肠。", "ms": "Kami makan sosej untuk sarapan hari ini." } },
            { "word": "pizza", "hint": "A round, baked flatbread topped with cheese and tomato sauce.", "translations": { "cn": "比萨", "ms": "piza" }, "sentences": { "en": "Let's share a large pepperoni pizza.", "cn": "让我们分享一个大的意大利腊肠比萨。", "ms": "Mari kita kongsi piza pepperoni yang besar." } },
            { "word": "steak", "hint": "A thick slice of high-quality meat.", "translations": { "cn": "牛排", "ms": "stik/daging salai" }, "sentences": { "en": "The chef cooked the steak perfectly.", "cn": "厨师完美地烹制了牛排。", "ms": "Tukang masak itu memasak stik dengan sempurna." } },
            { "word": "peas", "hint": "Small, round, green vegetables.", "translations": { "cn": "豌豆", "ms": "kacang pea" }, "sentences": { "en": "I don't like eating green peas.", "cn": "我不喜欢吃豌豆。", "ms": "Saya tidak suka makan kacang pea." } },
            { "word": "carrots", "hint": "Long, orange vegetables that rabbits like.", "translations": { "cn": "胡萝卜", "ms": "lobak merah" }, "sentences": { "en": "Carrots are good for your eyesight.", "cn": "胡萝卜对你的视力有好处。", "ms": "Lobak merah bagus untuk penglihatan anda." } }
        ]
    },
    "2": {
        "Unit 5: Free Time": [
            { "word": "monday", "hint": "The first day of the school week.", "translations": { "cn": "星期一", "ms": "Isnin" }, "sentences": { "en": "I go to school on Monday.", "cn": "我星期一去学校。", "ms": "Saya pergi ke sekolah pada hari Isnin." } },
            { "word": "wednesday", "hint": "The day between Tuesday and Thursday.", "translations": { "cn": "星期三", "ms": "Rabu" }, "sentences": { "en": "We have music class on Wednesday.", "cn": "我们星期三有音乐课。", "ms": "Kami ada kelas muzik pada hari Rabu." } },
            { "word": "friday", "hint": "The last day of the school week before the weekend.", "translations": { "cn": "星期五", "ms": "Jumaat" }, "sentences": { "en": "Friday is the best day of the week.", "cn": "星期五是一周中最好的一天。", "ms": "Jumaat ialah hari yang terbaik dalam seminggu." } },
            { "word": "weekend", "hint": "Saturday and Sunday.", "translations": { "cn": "周末", "ms": "hujung minggu" }, "sentences": { "en": "We go to the park at the weekend.", "cn": "我们周末去公园。", "ms": "Kami pergi ke taman pada hujung minggu." } },
            { "word": "swimming", "hint": "Moving your body through the water.", "translations": { "cn": "游泳", "ms": "berenang" }, "sentences": { "en": "I like swimming in the pool.", "cn": "我喜欢在池塘里游泳。", "ms": "Saya suka berenang di dalam kolam." } },
            { "word": "hiding", "hint": "Keeping out of sight during a game of hide-and-seek.", "translations": { "cn": "躲藏", "ms": "bersembunyi" }, "sentences": { "en": "He is hiding behind the big tree.", "cn": "他躲在那棵大树后面。", "ms": "Dia sedang bersembunyi di sebalik pokok besar itu." } },
            { "word": "singing", "hint": "Making musical sounds with your voice.", "translations": { "cn": "唱歌", "ms": "menyanyi" }, "sentences": { "en": "She is singing a beautiful song.", "cn": "她正在唱一首优美的歌。", "ms": "Dia sedang menyanyi sebuah lagu yang cantik." } },
            { "word": "reading", "hint": "Looking at and understanding words in a book.", "translations": { "cn": "阅读", "ms": "membaca" }, "sentences": { "en": "I enjoy reading books in the library.", "cn": "我喜欢在图书馆看书。", "ms": "Saya suka membaca buku di perpustakaan." } },
            { "word": "writing", "hint": "Using a pen or pencil to put words on paper.", "translations": { "cn": "书写/写作", "ms": "menulis" }, "sentences": { "en": "He is writing a letter to his friend.", "cn": "他正在给朋友写信。", "ms": "Dia sedang menulis surat kepada kawannya." } },
            { "word": "playing", "hint": "Having fun with toys or games.", "translations": { "cn": "玩耍", "ms": "bermain" }, "sentences": { "en": "The children are playing outside.", "cn": "孩子们在外面玩耍。", "ms": "Kanak-kanak itu sedang bermain di luar." } }
        ],
        "Unit 6: The Old House": [
            { "word": "bedroom", "hint": "The room in your house where you sleep.", "translations": { "cn": "卧室", "ms": "bilik tidur" }, "sentences": { "en": "My bedroom has a blue bed.", "cn": "我的卧室里有一张蓝色的床。", "ms": "Bilik tidur saya mempunyai katil biru." } },
            { "word": "kitchen", "hint": "The room where your parents cook food.", "translations": { "cn": "厨房", "ms": "dapur" }, "sentences": { "en": "Mother is cooking soup in the kitchen.", "cn": "妈妈正在厨房里煮汤。", "ms": "Ibu sedang memasak sup di dapur." } },
            { "word": "bathroom", "hint": "The room where you take a shower.", "translations": { "cn": "浴室", "ms": "bilik air" }, "sentences": { "en": "Brush your teeth in the bathroom.", "cn": "在浴室里刷牙。", "ms": "Berus gigi anda di dalam bilik air." } },
            { "word": "living", "hint": "The room where you sit and watch TV with family.", "translations": { "cn": "客厅", "ms": "ruang tamu" }, "sentences": { "en": "We watch TV in the living room.", "cn": "我们在客厅看电视。", "ms": "Kami menonton TV di ruang tamu." } },
            { "word": "dining", "hint": "The room with a big table where the family eats.", "translations": { "cn": "饭厅", "ms": "ruang makan" }, "sentences": { "en": "We eat dinner in the dining room.", "cn": "我们在饭厅吃晚饭。", "ms": "Kami makan malam di ruang makan." } },
            { "word": "cellar", "hint": "A dark room underneath a house.", "translations": { "cn": "地窖", "ms": "bilik bawah tanah/selar" }, "sentences": { "en": "The cellar is cold and dark.", "cn": "地窖里又冷又暗。", "ms": "Bilik bawah tanah itu sejuk dan gelap." } },
            { "word": "stairs", "hint": "Steps you use to go up or down in a house.", "translations": { "cn": "楼梯", "ms": "tangga" }, "sentences": { "en": "Walk up the stairs carefully.", "cn": "小心地走上楼梯。", "ms": "Naik tangga itu dengan berhati-hati." } },
            { "word": "house", "hint": "A building where people live.", "translations": { "cn": "房子", "ms": "rumah" }, "sentences": { "en": "The big house has a red roof.", "cn": "大房子有个红色的屋顶。", "ms": "Rumah besar itu mempunyai bumbung merah." } },
            { "word": "garden", "hint": "An outdoor area where flowers and grass grow.", "translations": { "cn": "花园", "ms": "taman" }, "sentences": { "en": "There are many flowers in the garden.", "cn": "花园里有很多花。", "ms": "Terdapat banyak bunga di dalam taman." } },
            { "word": "window", "hint": "An opening in a wall covered with glass.", "translations": { "cn": "窗户", "ms": "tingkap" }, "sentences": { "en": "Open the window for some fresh air.", "cn": "打开窗户换点新鲜空气。", "ms": "Buka tingkap untuk udara segar." } }
        ],
        "Unit 7: Get Dressed!": [
            { "word": "sweater", "hint": "You wear this warm clothing when you feel cold.", "translations": { "cn": "毛衣", "ms": "baju sejuk" }, "sentences": { "en": "Put on a sweater if you are cold.", "cn": "如果你冷就穿上毛衣。", "ms": "Pakai baju sejuk jika anda berasa sejuk." } },
            { "word": "shorts", "hint": "Short trousers you wear on a hot day.", "translations": { "cn": "短裤", "ms": "seluar pendek" }, "sentences": { "en": "I wear shorts on a sunny day.", "cn": "我在晴天穿短裤。", "ms": "Saya memakai seluar pendek pada hari panas." } },
            { "word": "jeans", "hint": "Blue trousers made of strong denim cloth.", "translations": { "cn": "牛仔裤", "ms": "seluar jean" }, "sentences": { "en": "I like wearing comfortable blue jeans.", "cn": "我喜欢穿舒服的蓝色牛仔裤。", "ms": "Saya suka memakai seluar jean biru yang selesa." } },
            { "word": "jacket", "hint": "A short coat you wear over your clothes.", "translations": { "cn": "夹克/外套", "ms": "jaket" }, "sentences": { "en": "Take your jacket with you today.", "cn": "今天带上你的夹克。", "ms": "Bawa jaket anda bersama hari ini." } },
            { "word": "skirt", "hint": "A piece of clothing worn by girls that hangs from the waist.", "translations": { "cn": "裙子", "ms": "skirt" }, "sentences": { "en": "The girl is wearing a pretty pink skirt.", "cn": "小女孩穿着一条漂亮的粉红色裙子。", "ms": "Budak perempuan itu memakai skirt merah jambu yang cantik." } },
            { "word": "shoes", "hint": "You wear these on your feet to walk outside.", "translations": { "cn": "鞋子", "ms": "kasut" }, "sentences": { "en": "Tie the laces of your shoes tightly.", "cn": "把鞋带系紧。", "ms": "Ikat tali kasut anda dengan ketat." } },
            { "word": "socks", "hint": "Soft coverings for your feet worn inside shoes.", "translations": { "cn": "袜子", "ms": "stoking" }, "sentences": { "en": "I wear warm socks in winter.", "cn": "我冬天穿暖和的袜子。", "ms": "Saya memakai stoking tebal pada musim sejuk." } },
            { "word": "tshirt", "hint": "A comfortable shirt with short sleeves.", "translations": { "cn": "T恤/短袖汗衫", "ms": "baju-T" }, "sentences": { "en": "The white tshirt is clean and dry.", "cn": "白色的T恤又干净又干爽。", "ms": "Baju-T putih itu bersih dan kering." } },
            { "word": "trousers", "hint": "Long pants that cover your legs.", "translations": { "cn": "裤子/长裤", "ms": "seluar panjang" }, "sentences": { "en": "Wear long trousers for the field trip.", "cn": "在野外旅行时穿长裤。", "ms": "Pakai seluar panjang untuk lawatan lapangan." } },
            { "word": "cap", "hint": "A hat with a peak to protect your eyes from the sun.", "translations": { "cn": "帽子/鸭舌帽", "ms": "topi" }, "sentences": { "en": "The boy is wearing a blue cap.", "cn": "那个男孩戴着一顶蓝色的帽子。", "ms": "Budak lelaki itu memakai topi biru." } }
        ],
        "Unit 8: The Robot": [
            { "word": "skeleton", "hint": "All the bones inside a body.", "translations": { "cn": "骨骼/骨架", "ms": "rangka" }, "sentences": { "en": "The skeleton protects our organs.", "cn": "骨骼保护我们的器官。", "ms": "Rangka melindungi organ kita." } },
            { "word": "robot", "hint": "A machine that can move and do tasks like a human.", "translations": { "cn": "机器人", "ms": "robot" }, "sentences": { "en": "The robot can dance and sing.", "cn": "机器人会跳舞和唱歌。", "ms": "Robot itu boleh menari dan menyanyi." } },
            { "word": "head", "hint": "The top part of your body where your brain is.", "translations": { "cn": "头", "ms": "kepala" }, "sentences": { "en": "Wear a helmet to protect your head.", "cn": "戴上头盔以保护你的头。", "ms": "Pakai topi keledar untuk melindungi kepala anda." } },
            { "word": "arm", "hint": "The long body part that connects your shoulder to your hand.", "translations": { "cn": "手臂", "ms": "lengan" }, "sentences": { "en": "Raise your arm to ask a question.", "cn": "举起手臂提问。", "ms": "Angkat lengan anda untuk bertanya soalan." } },
            { "word": "fingers", "hint": "You have five of these on each hand.", "translations": { "cn": "手指", "ms": "jari" }, "sentences": { "en": "I have ten fingers on my hands.", "cn": "我的手上有十个手指。", "ms": "Saya mempunyai sepuluh jari pada tangan saya." } },
            { "word": "hand", "hint": "The part of your body used for holding things.", "translations": { "cn": "手", "ms": "tangan" }, "sentences": { "en": "Wash your hands before eating.", "cn": "饭前洗手。", "ms": "Basuh tangan anda sebelum makan." } },
            { "word": "knee", "hint": "The joint in the middle of your leg.", "translations": { "cn": "膝盖", "ms": "lutut" }, "sentences": { "en": "He hurt his knee while playing football.", "cn": "他在踢足球时伤到了膝盖。", "ms": "Lututnya sakit semasa bermain bola sepak." } },
            { "word": "leg", "hint": "The body part you use for standing and walking.", "translations": { "cn": "腿", "ms": "kaki" }, "sentences": { "en": "The horse has four long legs.", "cn": "马有四条长腿。", "ms": "Kuda itu mempunyai empat kaki yang panjang." } },
            { "word": "toes", "hint": "The small parts at the end of your foot.", "translations": { "cn": "脚趾", "ms": "jari kaki" }, "sentences": { "en": "I can wiggle my toes easily.", "cn": "我可以轻松地摇动我的脚趾。", "ms": "Saya boleh menggerakkan jari kaki saya dengan mudah." } },
            { "word": "foot", "hint": "The bottom part of your leg that you stand on.", "translations": { "cn": "脚", "ms": "kaki" }, "sentences": { "en": "Put your shoe on your left foot.", "cn": "把鞋穿在你的左脚上。", "ms": "Sarungkan kasut pada kaki kiri anda." } }
        ],
        "Unit 9: At the Beach": [
            { "word": "beach", "hint": "A sandy place next to the sea.", "translations": { "cn": "海滩", "ms": "pantai" }, "sentences": { "en": "We love building sandcastles at the beach.", "cn": "我们喜欢在海滩筑沙堡。", "ms": "Kami suka membina istana pasir di pantai." } },
            { "word": "shell", "hint": "You can find this hard, empty object on the beach.", "translations": { "cn": "贝壳", "ms": "petala/kerang" }, "sentences": { "en": "I found a beautiful shell on the sand.", "cn": "我在沙滩上发现了一个美丽的贝壳。", "ms": "Saya menemui kerang yang cantik di atas pasir." } },
            { "word": "mountain", "hint": "A very high hill.", "translations": { "cn": "山", "ms": "gunung" }, "sentences": { "en": "Mount Kinabalu is a famous mountain.", "cn": "神山是一座著名的山。", "ms": "Gunung Kinabalu ialah gunung yang terkenal." } },
            { "word": "camera", "hint": "You use this device to take photos.", "translations": { "cn": "照相机", "ms": "kamera" }, "sentences": { "en": "Say cheese for the camera!", "cn": "对着照相机说‘茄子’！", "ms": "Sebut 'cheese' ke arah kamera!" } },
            { "word": "catch", "hint": "To grab and hold something that is moving, like a fish or a ball.", "translations": { "cn": "捕捉/抓住", "ms": "menangkap" }, "sentences": { "en": "Can you catch the ball?", "cn": "你能接住球吗？", "ms": "Bolehkah anda menangkap bola itu?" } },
            { "word": "paint", "hint": "To add color to a picture using a brush.", "translations": { "cn": "绘画/粉刷", "ms": "melukis/mengecat" }, "sentences": { "en": "I like to paint colorful pictures.", "cn": "我喜欢画五颜六色的画。", "ms": "Saya suka melukis gambar-gambar yang berwarna-warni." } },
            { "word": "photo", "hint": "A picture taken with a camera.", "translations": { "cn": "照片", "ms": "gambar/foto" }, "sentences": { "en": "This is a photo of my family.", "cn": "这是我全家的照片。", "ms": "Ini ialah foto keluarga saya." } },
            { "word": "sandcastle", "hint": "A building made of sand by children on the beach.", "translations": { "cn": "沙堡", "ms": "istana pasir" }, "sentences": { "en": "The waves washed away the sandcastle.", "cn": "海浪冲走了沙堡。", "ms": "Ombak telah menghanyutkan istana pasir itu." } },
            { "word": "ocean", "hint": "A very large area of salty water.", "translations": { "cn": "海洋", "ms": "lautan" }, "sentences": { "en": "The blue ocean is full of fish.", "cn": "蓝色的海洋里挤满了鱼。", "ms": "Lautan biru itu penuh dengan ikan." } },
            { "word": "island", "hint": "A piece of land surrounded by water.", "translations": { "cn": "岛屿", "ms": "pulau" }, "sentences": { "en": "Langkawi is a beautiful island.", "cn": "兰卡威是一个美丽的岛屿。", "ms": "Langkawi ialah sebuah pulau yang indah." } }
        ]
    },
    "3": {
        "Module 1: Welcome!": [
            { "word": "family", "hint": "Your parents, brothers, and sisters.", "translations": { "cn": "家庭/家人", "ms": "keluarga" }, "sentences": { "en": "I love my family very much.", "cn": "我很爱我的家人。", "ms": "Saya sangat sayang akan keluarga saya." } },
            { "word": "uncle", "hint": "Your father or mother's brother.", "translations": { "cn": "伯伯/叔叔/舅舅", "ms": "pakcik" }, "sentences": { "en": "My uncle lives in Kuala Lumpur.", "cn": "我的叔叔住在吉隆坡。", "ms": "Pakcik saya tinggal di Kuala Lumpur." } },
            { "word": "aunt", "hint": "Your father or mother's sister.", "translations": { "cn": "姑姑/姨姨/婶婶", "ms": "makcik" }, "sentences": { "en": "My aunt is a kind doctor.", "cn": "我的姨姨是一位善良的医生。", "ms": "Makcik saya ialah seorang doktor yang baik hati." } },
            { "word": "cousin", "hint": "Your aunt or uncle's child.", "translations": { "cn": "堂兄弟姐妹/表兄弟姐妹", "ms": "sepupu" }, "sentences": { "en": "I play games with my cousin.", "cn": "我和我的表弟玩游戏。", "ms": "Saya bermain permainan dengan sepupu saya." } },
            { "word": "pretty", "hint": "Nice or beautiful to look at.", "translations": { "cn": "漂亮", "ms": "cantik" }, "sentences": { "en": "The flowers in the garden are pretty.", "cn": "花园里的花很漂亮。", "ms": "Bunga-bunga di dalam taman itu sangat cantik." } },
            { "word": "ugly", "hint": "Not pleasant to look at.", "translations": { "cn": "丑陋", "ms": "hodoh" }, "sentences": { "en": "The ugly duckling became a swan.", "cn": "丑小鸭变成了天鹅。", "ms": "Anak itik yang hodoh itu menjadi seekor angsa." } },
            { "word": "straight", "hint": "Hair that has no curls or waves.", "translations": { "cn": "直(发)", "ms": "lurus" }, "sentences": { "en": "She has long straight hair.", "cn": "她有一头长直发。", "ms": "Dia mempunyai rambut lurus yang panjang." } },
            { "word": "curly", "hint": "Hair that is shaped like circles or springs.", "translations": { "cn": "卷(发)", "ms": "keriting" }, "sentences": { "en": "He has short curly hair.", "cn": "他有一头短卷发。", "ms": "Dia mempunyai rambut keriting yang pendek." } },
            { "word": "blonde", "hint": "Light yellow or golden hair color.", "translations": { "cn": "金发", "ms": "perang/blonde" }, "sentences": { "en": "The girl has beautiful blonde hair.", "cn": "那个女孩有一头漂亮的金色头发。", "ms": "Budak perempuan itu mempunyai rambut perang yang cantik." } },
            { "word": "purple", "hint": "A color made by mixing red and blue.", "translations": { "cn": "紫色", "ms": "ungu" }, "sentences": { "en": "My favorite color is purple.", "cn": "我最喜欢的颜色是紫色。", "ms": "Warna kegemaran saya ialah ungu." } }
        ],
        "Module 2: Every day": [
            { "word": "comb", "hint": "A tool used to make your hair tidy.", "translations": { "cn": "梳子", "ms": "sikat" }, "sentences": { "en": "I use a comb to tidy my hair.", "cn": "我用梳子整理头发。", "ms": "Saya menggunakan sikat untuk mengemaskan rambut." } },
            { "word": "brush", "hint": "You use this with toothpaste to clean your teeth.", "translations": { "cn": "牙刷/刷子", "ms": "berus" }, "sentences": { "en": "Brush your teeth twice a day.", "cn": "每天刷牙两次。", "ms": "Berus gigi anda dua kali sehari." } },
            { "word": "shower", "hint": "Washing your body while standing under water.", "translations": { "cn": "淋浴", "ms": "mandi (pancuran)" }, "sentences": { "en": "I take a shower every morning.", "cn": "我每天早晨淋浴。", "ms": "Saya mandi setiap pagi." } },
            { "word": "teeth", "hint": "The hard white things in your mouth used for biting.", "translations": { "cn": "牙齿", "ms": "gigi" }, "sentences": { "en": "Clean teeth make a bright smile.", "cn": "洁白的牙齿带来灿烂的笑容。", "ms": "Gigi yang bersih menghasilkan senyuman yang cerah." } },
            { "word": "dressed", "hint": "Putting on your clothes.", "translations": { "cn": "穿好衣服", "ms": "berpakaian" }, "sentences": { "en": "I get dressed quickly for school.", "cn": "我很快穿好衣服去上学。", "ms": "Saya berpakaian dengan cepat untuk ke sekolah." } },
            { "word": "breakfast", "hint": "The first meal you eat in the morning.", "translations": { "cn": "早餐", "ms": "sarapan" }, "sentences": { "en": "Eat a healthy breakfast every day.", "cn": "每天吃健康的早餐。", "ms": "Makan sarapan yang sihat setiap hari." } },
            { "word": "walk", "hint": "Moving on foot at a normal speed.", "translations": { "cn": "步行/走路", "ms": "berjalan" }, "sentences": { "en": "We walk to the park together.", "cn": "我们一起步向公园。", "ms": "Kami berjalan ke taman bersama-sama." } },
            { "word": "school", "hint": "The place where you go to learn.", "translations": { "cn": "学校", "ms": "sekolah" }, "sentences": { "en": "I learn many subjects at school.", "cn": "我在学校学习很多科目。", "ms": "Saya belajar banyak mata pelajaran di sekolah." } },
            { "word": "homework", "hint": "Schoolwork you have to do at home.", "translations": { "cn": "家庭作业", "ms": "kerja sekolah" }, "sentences": { "en": "Finish your homework before you play.", "cn": "玩耍之前先完成家庭作业。", "ms": "Siapkan kerja sekolah anda sebelum bermain." } },
            { "word": "sleep", "hint": "What you do in bed at night.", "translations": { "cn": "睡觉", "ms": "tidur" }, "sentences": { "en": "I need eight hours of sleep.", "cn": "我需要八小时的睡眠。", "ms": "Saya memerlukan lapan jam waktu tidur." } }
        ],
        "Module 3: Right now": [
            { "word": "playing", "hint": "Having fun with a game or sport.", "translations": { "cn": "玩耍", "ms": "bermain" }, "sentences": { "en": "The boys are playing football now.", "cn": "男孩们正在踢足球。", "ms": "Budak-budak lelaki itu sedang bermain bola sepak sekarang." } },
            { "word": "cleaning", "hint": "Removing dirt or tidying a room.", "translations": { "cn": "打扫/清洁", "ms": "membersihkan" }, "sentences": { "en": "She is cleaning the living room.", "cn": "她正在打扫客厅。", "ms": "Dia sedang membersihkan ruang tamu." } },
            { "word": "doing", "hint": "Performing an action or completing a task.", "translations": { "cn": "做", "ms": "melakukan" }, "sentences": { "en": "What are you doing at the moment?", "cn": "你现在在做什么？", "ms": "Apakah yang sedang anda lakukan sekarang?" } },
            { "word": "washing", "hint": "Cleaning something using water and soap.", "translations": { "cn": "清洗", "ms": "membasuh" }, "sentences": { "en": "He is washing the dirty car.", "cn": "他正在洗那辆脏车。", "ms": "Dia sedang membasuh kereta yang kotor itu." } },
            { "word": "making", "hint": "Creating or building something new.", "translations": { "cn": "制作", "ms": "membuat" }, "sentences": { "en": "Mother is making a delicious cake.", "cn": "妈妈正在做一个美味的蛋糕。", "ms": "Ibu sedang membuat kek yang sedap." } },
            { "word": "watering", "hint": "Giving water to plants so they can grow.", "translations": { "cn": "浇水", "ms": "menyiram" }, "sentences": { "en": "The gardener is watering the plants.", "cn": "园丁正在给植物浇水。", "ms": "Tukang kebun itu sedang menyiram pokok." } },
            { "word": "reading", "hint": "Looking at the words in a book to understand the story.", "translations": { "cn": "阅读", "ms": "membaca" }, "sentences": { "en": "She is reading a new story book.", "cn": "她正在读一本新的故事书。", "ms": "Dia sedang membaca buku cerita baharu." } },
            { "word": "flying", "hint": "Moving through the air, like a bird or an airplane.", "translations": { "cn": "飞行", "ms": "terbang" }, "sentences": { "en": "The bird is flying high in the sky.", "cn": "鸟在天空中高高飞翔。", "ms": "Burung itu sedang terbang tinggi di langit." } },
            { "word": "sleeping", "hint": "Resting with your eyes closed at night.", "translations": { "cn": "睡觉", "ms": "tidur" }, "sentences": { "en": "The baby is sleeping peacefully.", "cn": "宝宝正安详地睡着。", "ms": "Bayi itu sedang tidur dengan nyenyak." } },
            { "word": "jumping", "hint": "Pushing yourself off the ground into the air.", "translations": { "cn": "跳跃", "ms": "melompat" }, "sentences": { "en": "The kangaroo is jumping over logs.", "cn": "袋鼠正在跳过木头。", "ms": "Kanggaru itu sedang melompat melepasi kayu balak." } }
        ],
        "Module 4: Year in, year out": [
            { "word": "january", "hint": "The first month of the year.", "translations": { "cn": "一月", "ms": "Januari" }, "sentences": { "en": "The year starts in January.", "cn": "一年开始于一月。", "ms": "Tahun bermula pada bulan Januari." } },
            { "word": "february", "hint": "The second month of the year.", "translations": { "cn": "二月", "ms": "Februari" }, "sentences": { "en": "February is the shortest month.", "cn": "二月是最短的一个月。", "ms": "Februari ialah bulan yang paling pendek." } },
            { "word": "autumn", "hint": "The season when leaves turn brown and fall.", "translations": { "cn": "秋天", "ms": "musim luruh" }, "sentences": { "en": "Leaves fall from trees in autumn.", "cn": "秋天叶子从树上掉落。", "ms": "Daun-daun luruh dari pokok pada musim luruh." } },
            { "word": "winter", "hint": "The coldest season, sometimes with snow.", "translations": { "cn": "冬天", "ms": "musim sejuk" }, "sentences": { "en": "Winter is very cold and windy.", "cn": "冬天非常寒冷且多风。", "ms": "Musim sejuk sangat dingin dan berangin." } },
            { "word": "spring", "hint": "The season when flowers start to bloom.", "translations": { "cn": "春天", "ms": "musim bunga" }, "sentences": { "en": "Flowers bloom in the spring.", "cn": "花朵在春天绽放。", "ms": "Bunga-bunga berkembang pada musim bunga." } },
            { "word": "summer", "hint": "The hottest season of the year.", "translations": { "cn": "夏天", "ms": "musim panas" }, "sentences": { "en": "We go to the beach in summer.", "cn": "我们夏天去海滩。", "ms": "Kami pergi ke pantai pada musim panas." } },
            { "word": "snowing", "hint": "When soft, white, frozen flakes fall from the sky.", "translations": { "cn": "下雪", "ms": "bersalji" }, "sentences": { "en": "It is snowing in many countries.", "cn": "许多国家都在下雪。", "ms": "Ramai negara sedang mengalami salji." } },
            { "word": "windy", "hint": "When there is a lot of strong moving air.", "translations": { "cn": "多风", "ms": "berangin" }, "sentences": { "en": "It is a very windy day today.", "cn": "今天是一个多风的日子。", "ms": "Hari ini ialah hari yang sangat berangin." } },
            { "word": "raining", "hint": "When water falls from the clouds.", "translations": { "cn": "下雨", "ms": "hujan" }, "sentences": { "en": "It's raining, so take an umbrella.", "cn": "下雨了，带把伞吧。", "ms": "Hari sedang hujan, jadi bawalah payung." } },
            { "word": "cloudy", "hint": "When the sky is grey and full of clouds.", "translations": { "cn": "多云", "ms": "berawan" }, "sentences": { "en": "The sky is cloudy and grey today.", "cn": "今天天空多云阴暗。", "ms": "Langit berawan dan kelabu hari ini." } }
        ],
        "Module 5: My new house": [
            { "word": "wardrobe", "hint": "A tall cupboard where you hang your clothes.", "translations": { "cn": "衣柜", "ms": "almari baju" }, "sentences": { "en": "Hang your shirts in the wardrobe.", "cn": "把你的衬衫挂在衣柜里。", "ms": "Gantung kemeja anda di dalam almari baju." } },
            { "word": "armchair", "hint": "A comfortable, single seat with rests for your arms.", "translations": { "cn": "扶手椅", "ms": "kerusi lengan" }, "sentences": { "en": "Grandpa sits in his favorite armchair.", "cn": "爷爷坐在他最喜欢的扶手椅上。", "ms": "Datuk duduk di atas kerusi lengan kegemarannya." } },
            { "word": "bookcase", "hint": "A piece of furniture with shelves for storing books.", "translations": { "cn": "书架", "ms": "rak buku" }, "sentences": { "en": "I put my story books on the bookcase.", "cn": "我把我的故事书放在书架上。", "ms": "Saya meletakkan buku cerita saya di atas rak buku." } },
            { "word": "fridge", "hint": "A machine in the kitchen that keeps food cold.", "translations": { "cn": "冰箱", "ms": "peti sejuk" }, "sentences": { "en": "Keep the milk in the fridge.", "cn": "把牛奶放在冰箱里。", "ms": "Simpan susu di dalam peti sejuk." } },
            { "word": "mirror", "hint": "A glass object where you can see your own reflection.", "translations": { "cn": "镜子", "ms": "cermin" }, "sentences": { "en": "I look at myself in the mirror.", "cn": "我看着镜子里的自己。", "ms": "Saya melihat diri saya di dalam cermin." } },
            { "word": "clock", "hint": "An object that shows you the time.", "translations": { "cn": "时钟", "ms": "jam" }, "sentences": { "en": "The clock shows it is twelve o'clock.", "cn": "时钟显示现在是十二点。", "ms": "Jam itu menunjukkan pukul dua belas." } },
            { "word": "painting", "hint": "A picture made with paint on a canvas.", "translations": { "cn": "画/绘画", "ms": "lukisan" }, "sentences": { "en": "The painting on the wall is beautiful.", "cn": "墙上的画很漂亮。", "ms": "Lukisan di atas dinding itu sangat cantik." } },
            { "word": "radio", "hint": "A device that plays music or news through speakers.", "translations": { "cn": "收音机", "ms": "radio" }, "sentences": { "en": "Grandma likes listening to the radio.", "cn": "奶奶喜欢听收音机。", "ms": "Nenek suka mendengar radio." } },
            { "word": "floor", "hint": "The flat surface you walk on inside a room.", "translations": { "cn": "地板", "ms": "lantai" }, "sentences": { "en": "The wooden floor is clean and shiny.", "cn": "木地板干净又闪亮。", "ms": "Lantai kayu itu bersih dan berkilat." } },
            { "word": "ceiling", "hint": "The top surface inside a room, above your head.", "translations": { "cn": "天花板", "ms": "siling" }, "sentences": { "en": "There is a fan on the ceiling.", "cn": "天花板上有一个风扇。", "ms": "Terdapat sebuah kipas pada siling." } }
        ],
        "Module 6: Food, please!": [
            { "word": "onions", "hint": "Round vegetables that make you cry when you cut them.", "translations": { "cn": "洋葱", "ms": "bawang" }, "sentences": { "en": "Cutting onions makes my eyes water.", "cn": "切洋葱让我的眼睛流泪。", "ms": "Memotong bawang membuatkan mata saya berair." } },
            { "word": "lettuce", "hint": "A green leafy vegetable used to make salads.", "translations": { "cn": "生菜", "ms": "selada" }, "sentences": { "en": "I like fresh lettuce in my sandwich.", "cn": "我喜欢在三明治里放新鲜生菜。", "ms": "Saya suka selada segar di dalam sandwic saya." } },
            { "word": "chocolate", "hint": "A sweet, brown treat made from cocoa.", "translations": { "cn": "巧克力", "ms": "coklat" }, "sentences": { "en": "She loves eating dark chocolate.", "cn": "她喜欢吃黑巧克力。", "ms": "Dia sangat suka makan coklat hitam." } },
            { "word": "biscuits", "hint": "Small, baked, crispy and sweet snacks.", "translations": { "cn": "饼干", "ms": "biskut" }, "sentences": { "en": "Have a few biscuits with your tea.", "cn": "喝茶时吃几块饼干。", "ms": "Makanlah beberapa keping biskut bersama teh anda." } },
            { "word": "flour", "hint": "White powder used to bake cakes and bread.", "translations": { "cn": "面粉", "ms": "tepung" }, "sentences": { "en": "We need flour to make the cake.", "cn": "我们需要面粉来做蛋糕。", "ms": "Kami memerlukan tepung untuk membuat kek." } },
            { "word": "sugar", "hint": "Sweet white or brown crystals used in food and drinks.", "translations": { "cn": "糖", "ms": "gula" }, "sentences": { "en": "Don't put too much sugar in your coffee.", "cn": "咖啡里不要放太多糖。", "ms": "Jangan letak terlalu banyak gula di dalam kopi anda." } },
            { "word": "water", "hint": "A clear liquid you drink when you are thirsty.", "translations": { "cn": "水", "ms": "air" }, "sentences": { "en": "Drink plenty of water on a hot day.", "cn": "热天要多喝水。", "ms": "Minum banyak air pada hari yang panas." } },
            { "word": "lemonade", "hint": "A sweet yellow drink made from lemons.", "translations": { "cn": "柠檬水", "ms": "lemonade/air lemon" }, "sentences": { "en": "Cold lemonade is very refreshing.", "cn": "冷的柠檬水非常清爽。", "ms": "Lemonade sejuk sangat menyegarkan." } },
            { "word": "pancake", "hint": "A flat, round bread cooked in a pan and eaten for breakfast.", "translations": { "cn": "薄烤饼/煎饼", "ms": "lempeng/pancake" }, "sentences": { "en": "I eat pancakes with honey and fruit.", "cn": "我吃蜂蜜和水果配薄烤饼。", "ms": "Saya makan lempeng dengan madu dan buah-buahan." } },
            { "word": "omelette", "hint": "A dish made from beaten eggs fried in a pan.", "translations": { "cn": "煎蛋卷", "ms": "telur dadar/omelet" }, "sentences": { "en": "The chef made a cheese omelette.", "cn": "厨师做了一个奶酪煎蛋卷。", "ms": "Tukang masak itu membuat telur dadar keju." } }
        ],
        "Module 7: Out and about": [
            { "word": "library", "hint": "A quiet place where you borrow books.", "translations": { "cn": "图书馆", "ms": "perpustakaan" }, "sentences": { "en": "The library is full of interesting books.", "cn": "图书馆里装满了有趣的书。", "ms": "Perpustakaan itu penuh dengan buku yang menarik." } },
            { "word": "cinema", "hint": "A place where you buy a ticket to watch movies.", "translations": { "cn": "电影院", "ms": "pawagam" }, "sentences": { "en": "Let's watch a movie at the cinema.", "cn": "我们去电影院看电影吧。", "ms": "Mari kita menonton wayang di pawagam." } },
            { "word": "theatre", "hint": "A place where you watch actors perform a play live.", "translations": { "cn": "剧院", "ms": "teater" }, "sentences": { "en": "We went to the theatre to see a play.", "cn": "我们去剧院看戏了。", "ms": "Kami pergi ke teater untuk menonton persembahan." } },
            { "word": "museum", "hint": "A place where you look at old, historical things.", "translations": { "cn": "博物馆", "ms": "muzium" }, "sentences": { "en": "The museum has many ancient artifacts.", "cn": "博物馆里有许多古代文物。", "ms": "Muzium itu mempunyai banyak artifak purba." } },
            { "word": "hospital", "hint": "A large building where doctors treat sick people.", "translations": { "cn": "医院", "ms": "hospital" }, "sentences": { "en": "The sick man was taken to the hospital.", "cn": "生病的人被送往了医院。", "ms": "Lelaki yang sakit itu dibawa ke hospital." } },
            { "word": "restaurant", "hint": "A place where you pay to eat food prepared by a chef.", "translations": { "cn": "餐馆", "ms": "restoran" }, "sentences": { "en": "We are eating dinner at a restaurant.", "cn": "我们在一家餐馆吃晚饭。", "ms": "Kami sedang makan malam di sebuah restoran." } },
            { "word": "straight", "hint": "Moving forward without turning.", "translations": { "cn": "直行", "ms": "terus" }, "sentences": { "en": "Go straight until you reach the park.", "cn": "直走直到你到达公园。", "ms": "Jalan terus sehingga anda sampai ke taman." } },
            { "word": "right", "hint": "The direction opposite to left.", "translations": { "cn": "右边", "ms": "kanan" }, "sentences": { "en": "Turn right at the traffic lights.", "cn": "在红绿灯处右转。", "ms": "Pusing kanan di lampu isyarat." } },
            { "word": "left", "hint": "The direction opposite to right.", "translations": { "cn": "左边", "ms": "kiri" }, "sentences": { "en": "Take the first road on the left.", "cn": "走左边第一条路。", "ms": "Ambil jalan pertama di sebelah kiri." } },
            { "word": "street", "hint": "A road in a town or city with houses and shops.", "translations": { "cn": "街道", "ms": "jalan/jalan raya" }, "sentences": { "en": "Cross the street only at the zebra crossing.", "cn": "只能在斑马线过马路。", "ms": "Melintas jalan raya hanya di lintasan belang." } }
        ],
        "Module 8: Where were you yesterday?": [
            { "word": "yesterday", "hint": "The day before today.", "translations": { "cn": "昨天", "ms": "semalam" }, "sentences": { "en": "I went to the zoo yesterday.", "cn": "我昨天去了动物园。", "ms": "Saya telah pergi ke zoo semalam." } },
            { "word": "morning", "hint": "The early part of the day before noon.", "translations": { "cn": "早晨", "ms": "pagi" }, "sentences": { "en": "Good morning, how are you today?", "cn": "早安，你今天好吗？", "ms": "Selamat pagi, apa khabar anda hari ini?" } },
            { "word": "afternoon", "hint": "The time of day between lunch and evening.", "translations": { "cn": "下午", "ms": "petang" }, "sentences": { "en": "He plays football in the afternoon.", "cn": "他下午踢足球。", "ms": "Dia bermain bola sepak pada waktu petang." } },
            { "word": "evening", "hint": "The time of day when the sun goes down.", "translations": { "cn": "晚上/傍晚", "ms": "malam" }, "sentences": { "en": "We have family dinner in the evening.", "cn": "我们在晚上有家庭晚餐。", "ms": "Kami makan malam sekeluarga pada waktu malam." } },
            { "word": "circus", "hint": "A traveling show with clowns, acrobats, and animals.", "translations": { "cn": "马戏团", "ms": "sarkas" }, "sentences": { "en": "The circus performers were very talented.", "cn": "马戏团的表演者非常有才华。", "ms": "Para penghibur sarkas sangat berbakat." } },
            { "word": "funny", "hint": "Something that makes you laugh.", "translations": { "cn": "滑稽/有趣", "ms": "lucu/kelakar" }, "sentences": { "en": "The clown told a very funny joke.", "cn": "小丑讲了一个非常滑稽的笑话。", "ms": "Badut itu menceritakan satu jenaka yang sangat lucu." } },
            { "word": "scary", "hint": "Something that makes you feel frightened.", "translations": { "cn": "可怕", "ms": "menakutkan" }, "sentences": { "en": "The horror movie was too scary for me.", "cn": "这部恐怖电影对我来说太可怕了。", "ms": "Filem seram itu terlalu menakutkan bagi saya." } },
            { "word": "boring", "hint": "Not interesting at all.", "translations": { "cn": "乏味/无聊", "ms": "membosankan" }, "sentences": { "en": "I found the long lecture boring.", "cn": "我觉得长篇讲座很乏味。", "ms": "Saya rasa syarahan yang panjang itu membosankan." } },
            { "word": "delicious", "hint": "Food that tastes very, very good.", "translations": { "cn": "美味", "ms": "sedap/lazat" }, "sentences": { "en": "This chocolate cake is delicious.", "cn": "这个巧克力蛋糕很美味。", "ms": "Kek coklat ini sangat sedap." } },
            { "word": "popcorn", "hint": "A snack made from heated corn kernels, eaten at the cinema.", "translations": { "cn": "爆米花", "ms": "bertih jagung/popcorn" }, "sentences": { "en": "Watching a movie without popcorn is not complete.", "cn": "看电影没有爆米花是不完整的。", "ms": "Menonton wayang tanpa popcorn adalah tidak lengkap." } }
        ],
        "Module 9: On holiday": [
            { "word": "island", "hint": "Land that is completely surrounded by water.", "translations": { "cn": "岛屿", "ms": "pulau" }, "sentences": { "en": "The tropical island has white sandy beaches.", "cn": "热带岛屿有洁白的沙滩。", "ms": "Pulau tropika itu mempunyai pantai berpasir putih." } },
            { "word": "sailing", "hint": "Traveling across water in a boat with sails.", "translations": { "cn": "航行/帆船运动", "ms": "belayar" }, "sentences": { "en": "We went sailing on the lake.", "cn": "我们在湖上航行。", "ms": "Kami telah pergi belayar di tasik." } },
            { "word": "sunbathe", "hint": "Lying in the sun to make your skin darker.", "translations": { "cn": "日光浴", "ms": "berjemur" }, "sentences": { "en": "Don't forget sunscreen when you sunbathe.", "cn": "日光浴时别忘了涂防晒霜。", "ms": "Jangan lupa pelindung matahari semasa anda berjemur." } },
            { "word": "forest", "hint": "A large area with many trees and wild animals.", "translations": { "cn": "森林", "ms": "hutan" }, "sentences": { "en": "The deep forest is full of mysteries.", "cn": "深邃的森林里充满了奥秘。", "ms": "Hutan yang tebal itu penuh dengan misteri." } },
            { "word": "mountain", "hint": "A very high part of the land, much higher than a hill.", "translations": { "cn": "大山", "ms": "gunung" }, "sentences": { "en": "The top of the mountain is covered in snow.", "cn": "山顶被雪覆盖着。", "ms": "Puncak gunung itu dilitupi salji." } },
            { "word": "souvenir", "hint": "Something you buy to remember a place you visited.", "translations": { "cn": "纪念品", "ms": "cenderamata" }, "sentences": { "en": "I bought a small souvenir from Malacca.", "cn": "我从马六甲买了一个小纪念品。", "ms": "Saya membeli cenderamata kecil dari Melaka." } },
            { "word": "swimming", "hint": "Moving through water by using your arms and legs.", "translations": { "cn": "游泳", "ms": "berenang" }, "sentences": { "en": "Swimming is a great way to stay fit.", "cn": "游泳是保持健康的好方法。", "ms": "Berenang ialah cara yang baik untuk kekal cergas." } },
            { "word": "packing", "hint": "Putting your things into a suitcase before a trip.", "translations": { "cn": "收拾行李", "ms": "mengemas beg" }, "sentences": { "en": "I am packing my bag for the holidays.", "cn": "我正在收拾包准备放假。", "ms": "Saya sedang mengemas beg saya untuk percutian." } },
            { "word": "summer", "hint": "The warmest season of the year.", "translations": { "cn": "夏季", "ms": "musim panas" }, "sentences": { "en": "The summer heat can be quite strong.", "cn": "夏天的热浪可能相当强烈。", "ms": "Haba musim panas boleh menjadi sangat kuat." } },
            { "word": "luggage", "hint": "Bags and cases you take with you when you travel.", "translations": { "cn": "行李", "ms": "bagasi" }, "sentences": { "en": "The porter helped us with our luggage.", "cn": "搬运工帮我们搬行李。", "ms": "Porter itu membantu kami dengan bagasi kami." } }
        ],
        "Module 10: The world around us": [
            { "word": "planet", "hint": "A large round object that moves around a star.", "translations": { "cn": "行星", "ms": "planet" }, "sentences": { "en": "Earth is the third planet from the sun.", "cn": "地球是太阳系中第三颗行星。", "ms": "Bumi ialah planet ketiga dari matahari." } },
            { "word": "giraffe", "hint": "An animal with a very long neck and spotted skin.", "translations": { "cn": "长颈鹿", "ms": "zirafah" }, "sentences": { "en": "The giraffe eats leaves from the treetops.", "cn": "长颈鹿吃树梢上的叶子。", "ms": "Zirafah makan daun-daun dari puncak pokok." } },
            { "word": "strong", "hint": "Having a lot of power or force.", "translations": { "cn": "强壮", "ms": "kuat" }, "sentences": { "en": "The athlete has very strong muscles.", "cn": "这位运动员有非常强壮的肌肉。", "ms": "Atlet itu mempunyai otot yang sangat kuat." } },
            { "word": "dinosaur", "hint": "A large animal that lived millions of years ago.", "translations": { "cn": "恐龙", "ms": "dinosaur" }, "sentences": { "en": "The museum has a huge dinosaur skeleton.", "cn": "博物馆有一个巨大的恐龙骨架。", "ms": "Muzium itu mempunyai rangka dinosaur yang besar." } },
            { "word": "ostrich", "hint": "A very large bird that cannot fly but runs fast.", "translations": { "cn": "鸵鸟", "ms": "burung unta" }, "sentences": { "en": "The ostrich is the world's largest bird.", "cn": "鸵鸟是世界上最大的鸟类。", "ms": "Burung unta ialah burung yang paling besar di dunia." } },
            { "word": "cheetah", "hint": "A wild cat that can run faster than any other animal.", "translations": { "cn": "猎豹", "ms": "citah" }, "sentences": { "en": "A cheetah can reach incredible speeds.", "cn": "猎豹可以达到令人难以置信的速度。", "ms": "Seekor citah boleh mencapai kelajuan yang luar biasa." } },
            { "word": "whale", "hint": "A very large mammal that lives in the ocean.", "translations": { "cn": "鲸鱼", "ms": "paus" }, "sentences": { "en": "The blue whale is the largest animal.", "cn": "蓝鲸是最大的动物。", "ms": "Paus biru ialah haiwan yang paling besar." } },
            { "word": "hummingbird", "hint": "A tiny bird that can move its wings very fast.", "translations": { "cn": "蜂鸟", "ms": "burung kelicap/hummingbird" }, "sentences": { "en": "The tiny hummingbird drinks nectar.", "cn": "微小的蜂鸟吸食花蜜。", "ms": "Burung kelicap yang kecil meminum nektar." } },
            { "word": "smallest", "hint": "The tiniest size of all.", "translations": { "cn": "最小的", "ms": "paling kecil" }, "sentences": { "en": "He found the smallest pebble on the beach.", "cn": "他在海滩上找到了最小的卵石。", "ms": "Dia menemui anak batu yang paling kecil di pantai." } },
            { "word": "largest", "hint": "The biggest size of all.", "translations": { "cn": "最大的", "ms": "paling besar" }, "sentences": { "en": "Russia is the largest country by area.", "cn": "按面积计算，俄罗斯是最大的国家。", "ms": "Rusia adalah negara yang paling besar mengikut keluasan." } }
        ]
    },
    "4": {
        "Module 1: Where are you from?": [
            { "word": "mexican", "hint": "A person who comes from Mexico.", "translations": { "cn": "墨西哥人", "ms": "orang Mexico" }, "sentences": { "en": "He is Mexican and speaks Spanish.", "cn": "他是墨西哥人，说西班牙语。", "ms": "Dia orang Mexico dan bercakap bahasa Sepanyol." } },
            { "word": "korean", "hint": "A person who comes from Korea.", "translations": { "cn": "韩国人", "ms": "orang Korea" }, "sentences": { "en": "She likes Korean food and music.", "cn": "她喜欢韩国食物和音乐。", "ms": "Dia suka makanan dan muzik Korea." } },
            { "word": "american", "hint": "A person who comes from the United States.", "translations": { "cn": "美国人", "ms": "orang Amerika" }, "sentences": { "en": "My cousin is American.", "cn": "我的表弟是美国人。", "ms": "Sepupu saya orang Amerika." } },
            { "word": "brazilian", "hint": "A person who comes from Brazil.", "translations": { "cn": "巴西人", "ms": "orang Brazil" }, "sentences": { "en": "The Brazilian football team is famous.", "cn": "巴西足球队很有名。", "ms": "Pasukan bola sepak Brazil sangat terkenal." } },
            { "word": "skating", "hint": "Gliding on ice with special shoes.", "translations": { "cn": "滑冰", "ms": "luncur ais" }, "sentences": { "en": "We go ice skating in the winter.", "cn": "我们冬天去滑冰。", "ms": "Kami pergi meluncur ais pada musim sejuk." } },
            { "word": "chess", "hint": "A board game played with kings, queens, and knights.", "translations": { "cn": "国际象棋", "ms": "catur" }, "sentences": { "en": "Playing chess requires deep concentration.", "cn": "下国际象棋需要高度集中注意力。", "ms": "Bermain catur memerlukan tumpuan yang mendalam." } },
            { "word": "british", "hint": "A person who comes from the UK.", "translations": { "cn": "英国人", "ms": "orang British/Inggeris" }, "sentences": { "en": "The British Museum is in London.", "cn": "大英博物馆在伦敦。", "ms": "Muzium British berada di London." } },
            { "word": "malaysian", "hint": "A person who comes from Malaysia.", "translations": { "cn": "马来西亚人", "ms": "orang Malaysia" }, "sentences": { "en": "I am proud to be Malaysian.", "cn": "我为自己是马来西亚人而自豪。", "ms": "Saya bangga menjadi orang Malaysia." } },
            { "word": "chinese", "hint": "A person who comes from China.", "translations": { "cn": "中国人", "ms": "orang Cina" }, "sentences": { "en": "He is learning to speak Chinese.", "cn": "他正在学习说中文。", "ms": "Dia sedang belajar bercakap bahasa Cina." } },
            { "word": "karate", "hint": "A martial art from Japan.", "translations": { "cn": "空手道", "ms": "karate" }, "sentences": { "en": "She earned a black belt in karate.", "cn": "她获得了空手道黑带。", "ms": "Dia mendapat tali pinggang hitam dalam karate." } }
        ],
        "Module 2: My week": [
            { "word": "art", "hint": "A subject where you draw and paint.", "translations": { "cn": "美术", "ms": "seni" }, "sentences": { "en": "We painted beautiful flowers in art class.", "cn": "我们在美术课上画了漂亮的花。", "ms": "Kami melukis bunga yang cantik dalam kelas seni." } },
            { "word": "timetable", "hint": "A schedule that shows what classes you have every day.", "translations": { "cn": "课程表", "ms": "jadual waktu" }, "sentences": { "en": "Check the timetable for your next lesson.", "cn": "查看下一节课的课程表。", "ms": "Semak jadual waktu untuk pelajaran anda yang seterusnya." } },
            { "word": "maths", "hint": "A subject where you learn about numbers and counting.", "translations": { "cn": "数学", "ms": "matematik" }, "sentences": { "en": "Solving maths problems can be challenging.", "cn": "解决数学问题可能具有挑战性。", "ms": "Menyelesaikan masalah matematik boleh menjadi mencabar." } },
            { "word": "science", "hint": "A subject where you do experiments.", "translations": { "cn": "科学", "ms": "sains" }, "sentences": { "en": "We learned about plants in science today.", "cn": "我们今天在科学课上学习了植物。", "ms": "Kami belajar tentang tumbuh-tumbuhan dalam sains hari ini." } },
            { "word": "music", "hint": "A subject where you sing or play instruments.", "translations": { "cn": "音乐", "ms": "muzik" }, "sentences": { "en": "I play the recorder in music class.", "cn": "我在音乐课上吹竖笛。", "ms": "Saya bermain rekoder dalam kelas muzik." } },
            { "word": "homework", "hint": "Schoolwork you have to do at home.", "translations": { "cn": "家庭作业", "ms": "kerja rumah" }, "sentences": { "en": "Finish your homework before going out.", "cn": "出去之前先完成作业。", "ms": "Siapkan kerja rumah anda sebelum keluar." } },
            { "word": "history", "hint": "A subject where you learn about the past.", "translations": { "cn": "历史", "ms": "sejarah" }, "sentences": { "en": "History tells us about ancient civilizations.", "cn": "历史告诉我们关于古代文明的事。", "ms": "Sejarah memberitahu kita tentang tamadun kuno." } },
            { "word": "english", "hint": "The language you are learning in this class.", "translations": { "cn": "英语", "ms": "bahasa Inggeris" }, "sentences": { "en": "We practice speaking English every day.", "cn": "我们每天练习说英语。", "ms": "Kami berlatih bertutur bahasa Inggeris setiap hari." } },
            { "word": "reading", "hint": "Looking at and understanding written words.", "translations": { "cn": "阅读", "ms": "membaca" }, "sentences": { "en": "I enjoy reading books in the library.", "cn": "我喜欢在图书馆看书。", "ms": "Saya gemar membaca buku di perpustakaan." } },
            { "word": "writing", "hint": "Forming letters and words with a pencil.", "translations": { "cn": "写作", "ms": "menulis" }, "sentences": { "en": "Writing helps me express my thoughts.", "cn": "写作帮助我表达想法。", "ms": "Menulis membantu saya meluahkan fikiran saya." } }
        ],
        "Module 3: In the past": [
            { "word": "mummy", "hint": "A dead body wrapped in bandages from ancient Egypt.", "translations": { "cn": "木乃伊", "ms": "mumia" }, "sentences": { "en": "The museum has an ancient Egyptian mummy.", "cn": "博物馆里有一具古埃及木乃伊。", "ms": "Muzium itu mempunyai mumia Mesir kuno." } },
            { "word": "pyramid", "hint": "A large triangle-shaped building in Egypt.", "translations": { "cn": "金字塔", "ms": "piramid" }, "sentences": { "en": "The Great Pyramid is a world wonder.", "cn": "大金字塔是世界奇迹。", "ms": "Piramid Agung ialah keajaiban dunia." } },
            { "word": "body", "hint": "The physical structure of a person or animal.", "translations": { "cn": "身体", "ms": "badan/tubuh" }, "sentences": { "en": "Exercise is good for your body.", "cn": "锻炼对你的身体有好处。", "ms": "Senaman adalah baik untuk tubuh anda." } },
            { "word": "bandage", "hint": "A strip of cloth used to wrap an injury.", "translations": { "cn": "绷带", "ms": "balutan/bandage" }, "sentences": { "en": "The nurse put a bandage on my cut.", "cn": "护士在我的伤口上绑了绷带。", "ms": "Jururawat meletakkan balutan pada luka saya." } },
            { "word": "treasure", "hint": "A collection of gold, silver, and jewels.", "translations": { "cn": "宝藏", "ms": "harta karun" }, "sentences": { "en": "Pirates buried their treasure on the island.", "cn": "海盗把宝藏埋在了岛上。", "ms": "Lanun menanam harta karun mereka di pulau itu." } },
            { "word": "desert", "hint": "A very hot, dry, and sandy place.", "translations": { "cn": "沙漠", "ms": "padang pasir/gurun" }, "sentences": { "en": "Camels can survive in the hot desert.", "cn": "骆驼可以在炎热的沙漠中生存。", "ms": "Unta boleh bertahan di padang pasir yang panas." } },
            { "word": "tomb", "hint": "A stone room where a dead person is buried.", "translations": { "cn": "坟墓", "ms": "makam" }, "sentences": { "en": "The pharaoh was buried in a secret tomb.", "cn": "法老被埋在一个秘密的陵墓里。", "ms": "Firaun itu dikuburkan di dalam makam rahsia." } },
            { "word": "pharaoh", "hint": "A king of ancient Egypt.", "translations": { "cn": "法老", "ms": "firaun" }, "sentences": { "en": "Tutankhamun was a famous young pharaoh.", "cn": "图坦卡蒙是一位著名的年轻法老。", "ms": "Tutankhamun ialah firaun muda yang terkenal." } },
            { "word": "ancient", "hint": "Something from a very, very long time ago.", "translations": { "cn": "古代", "ms": "kuno/purba" }, "sentences": { "en": "We visited the ancient ruins of Rome.", "cn": "我们参观了罗马的古代遗址。", "ms": "Kami melawat runtuhan purba Rom." } },
            { "word": "wrapped", "hint": "Covered completely with paper or cloth.", "translations": { "cn": "包裹", "ms": "dibalut" }, "sentences": { "en": "The gift was wrapped in colorful paper.", "cn": "礼物用彩纸包裹着。", "ms": "Hadiah itu dibalut dengan kertas berwarna-warni." } }
        ],
        "Module 4: Celebrations": [
            { "word": "parade", "hint": "People walking together in the street to celebrate something.", "translations": { "cn": "游行", "ms": "perarakan" }, "sentences": { "en": "The National Day parade was spectacular.", "cn": "国庆日游行非常壮观。", "ms": "Perarakan Hari Kebangsaan sangat menakjubkan." } },
            { "word": "costume", "hint": "Special clothes you wear for a performance or a party.", "translations": { "cn": "服装", "ms": "pakaian seragam/kostum" }, "sentences": { "en": "I wore a superhero costume to the party.", "cn": "我穿着超级英雄的服装去参加派对。", "ms": "Saya memakai kostum adiwira ke parti itu." } },
            { "word": "scout", "hint": "A boy or girl in uniform who learns outdoor skills.", "translations": { "cn": "童子军", "ms": "pengakap" }, "sentences": { "en": "The scouts learned how to pitch a tent.", "cn": "童子军学会了如何搭帐篷。", "ms": "Pengakap belajar cara memasang khemah." } },
            { "word": "nurse", "hint": "A person who helps sick people in a clinic or hospital.", "translations": { "cn": "护士", "ms": "jururawat" }, "sentences": { "en": "The nurse checked the patient's temperature.", "cn": "护士检查了病人的体温。", "ms": "Jururawat memeriksa suhu pesakit." } },
            { "word": "police", "hint": "People who catch thieves and keep the town safe.", "translations": { "cn": "警察", "ms": "polis" }, "sentences": { "en": "The police directed traffic during the event.", "cn": "警察在活动期间指挥交通。", "ms": "Polis mengawal lalu lintas semasa acara itu." } },
            { "word": "soldier", "hint": "A person who serves in the army.", "translations": { "cn": "士兵", "ms": "askar/tentera" }, "sentences": { "en": "The soldier stood guard at the palace.", "cn": "士兵在宫殿守卫。", "ms": "Askar itu berkawal di istana." } },
            { "word": "musician", "hint": "A person who plays instruments for a living.", "translations": { "cn": "音乐家", "ms": "pemuzik" }, "sentences": { "en": "A talented musician played the violin.", "cn": "一位才华横溢的音乐家演奏了小提琴。", "ms": "Seorang pemuzik berbakat memainkan biola." } },
            { "word": "festival", "hint": "A special day or period of celebration.", "translations": { "cn": "节日", "ms": "pesta/perayaan" }, "sentences": { "en": "We celebrate the mid-autumn festival.", "cn": "我们庆祝中秋节。", "ms": "Kami menyambut perayaan pertengahan musim luruh." } },
            { "word": "independence", "hint": "When a country is free to rule itself, Merdeka.", "translations": { "cn": "独立", "ms": "kemerdekaan" }, "sentences": { "en": "Independence Day is a significant holiday.", "cn": "独立日是一个重要的节日。", "ms": "Hari Kemerdekaan ialah cuti yang penting." } },
            { "word": "fireworks", "hint": "Explosives that light up the night sky during celebrations.", "translations": { "cn": "烟花", "ms": "bunga api" }, "sentences": { "en": "The fireworks lit up the night sky.", "cn": "烟花照亮了夜空。", "ms": "Bunga api menerangi langit malam." } }
        ],
        "Module 5: Eating right": [
            { "word": "peach", "hint": "A soft, sweet, and round fruit with a large pit.", "translations": { "cn": "桃子", "ms": "pic/buah pic" }, "sentences": { "en": "The peach is ripe and juicy.", "cn": "桃子成熟多汁。", "ms": "Buah pic itu sudah masak dan berjus." } },
            { "word": "kiwi", "hint": "A small green fruit with brown, hairy skin.", "translations": { "cn": "猕猴桃", "ms": "kiwi/buah kiwi" }, "sentences": { "en": "Kiwi fruit is high in vitamin C.", "cn": "猕猴桃含有丰富的维生素C。", "ms": "Buah kiwi kaya dengan vitamin C." } },
            { "word": "butter", "hint": "A yellow fat made from milk, used on bread or in baking.", "translations": { "cn": "黄油", "ms": "mentega" }, "sentences": { "en": "Spread some butter on your toast.", "cn": "在吐司上抹点黄油。", "ms": "Sapu sedikit mentega pada roti bakar anda." } },
            { "word": "flour", "hint": "White powder used for making bread and cakes.", "translations": { "cn": "面粉", "ms": "tepung" }, "sentences": { "en": "We need two cups of flour for the recipe.", "cn": "食谱中我们需要两杯面粉。", "ms": "Kami perlukan dua cawan tepung untuk resipi itu." } },
            { "word": "sugar", "hint": "Sweet white or brown crystals used to make food sweet.", "translations": { "cn": "糖", "ms": "gula" }, "sentences": { "en": "Too much sugar is bad for your teeth.", "cn": "吃太多糖对牙齿不好。", "ms": "Terlalu banyak gula tidak baik untuk gigi anda." } },
            { "word": "biscuit", "hint": "A small, baked, sweet treat.", "translations": { "cn": "饼干", "ms": "biskut" }, "sentences": { "en": "I had a chocolate biscuit with my milk.", "cn": "我喝牛奶时吃了一块巧克力饼干。", "ms": "Saya makan biskut coklat dengan susu saya." } },
            { "word": "packet", "hint": "A small paper or plastic container for snacks.", "translations": { "cn": "小包/包装", "ms": "paket" }, "sentences": { "en": "He bought a packet of crisps.", "cn": "他买了一包薯片。", "ms": "Dia membeli sepaket kerepek." } },
            { "word": "carton", "hint": "A cardboard box used to hold milk or juice.", "translations": { "cn": "纸盒", "ms": "karton" }, "sentences": { "en": "Buy a carton of fresh orange juice.", "cn": "买一盒新鲜橙汁。", "ms": "Beli sekarton jus oren segar." } },
            { "word": "yogurt", "hint": "A thick, sour dairy product made from milk.", "translations": { "cn": "酸奶", "ms": "yogurt" }, "sentences": { "en": "Yogurt with fruit is a healthy snack.", "cn": "加水果的酸奶是健康的零食。", "ms": "Yogurt dengan buah ialah snek yang sihat." } },
            { "word": "tomato", "hint": "A round red fruit used as a vegetable in cooking.", "translations": { "cn": "番茄", "ms": "tomat/tomato" }, "sentences": { "en": "Tomato is a key ingredient in pasta sauce.", "cn": "番茄是意面酱的主要成分。", "ms": "Tomato ialah bahan utama dalam sos pasta." } }
        ],
        "Module 6: Getting around": [
            { "word": "helmet", "hint": "A hard hat you wear to protect your head.", "translations": { "cn": "头盔", "ms": "topi keledar" }, "sentences": { "en": "Always wear a helmet when riding a bike.", "cn": "骑自行车时一定要戴头盔。", "ms": "Sentiasa pakai topi keledar semasa menunggang basikal." } },
            { "word": "ticket", "hint": "A piece of paper you buy to ride a train or bus.", "translations": { "cn": "车票/门票", "ms": "tiket" }, "sentences": { "en": "Show your ticket to the conductor.", "cn": "向乘务员出示你的票。", "ms": "Tunjukkan tiket anda kepada konduktor." } },
            { "word": "pavement", "hint": "The path where people walk next to a road.", "translations": { "cn": "人行道", "ms": "kaki lima/jalan kaki" }, "sentences": { "en": "Walk on the pavement to stay safe.", "cn": "走在人行道上以保持安全。", "ms": "Berjalan di atas kaki lima untuk keselamatan." } },
            { "word": "pedal", "hint": "The part of a bicycle you push with your foot.", "translations": { "cn": "踏板", "ms": "pengayuh" }, "sentences": { "en": "Push the pedal to make the bike go.", "cn": "踩踏板让自行车前进。", "ms": "Tekan pengayuh untuk menggerakkan basikal." } },
            { "word": "handlebar", "hint": "The part of a bicycle you hold with your hands to steer.", "translations": { "cn": "车把手", "ms": "pemegang basikal" }, "sentences": { "en": "Keep both hands on the handlebar.", "cn": "双手握住车把手。", "ms": "Pegang kedua-dua belah pemegang basikal itu." } },
            { "word": "ambulance", "hint": "A special van that takes sick people to the hospital quickly.", "translations": { "cn": "救护车", "ms": "ambulans" }, "sentences": { "en": "The ambulance arrived with sirens blaring.", "cn": "救护车鸣着警笛赶到了。", "ms": "Ambulans tiba dengan siren yang kuat." } },
            { "word": "seatbelt", "hint": "A strap you wear in a car to keep you safe.", "translations": { "cn": "安全带", "ms": "tali pinggang keledar" }, "sentences": { "en": "Buckle your seatbelt before we start.", "cn": "出发前扣好安全带。", "ms": "Pakai tali pinggang keledar sebelum kita mulakan." } },
            { "word": "crossing", "hint": "The zebra lines on the road where people walk across.", "translations": { "cn": "人行横道", "ms": "lintasan belang/lintasan pejalan kaki" }, "sentences": { "en": "Use the zebra crossing to cross the road.", "cn": "走斑马线过马路。", "ms": "Gunakan lintasan belang untuk melintas jalan." } },
            { "word": "traffic", "hint": "Many cars moving on the road at the same time.", "translations": { "cn": "交通", "ms": "lalu lintas" }, "sentences": { "en": "The morning traffic was very heavy.", "cn": "早晨的交通非常拥堵。", "ms": "Lalu lintas pada waktu pagi sangat sesak." } },
            { "word": "steering", "hint": "The wheel the driver uses to control the car.", "translations": { "cn": "方向盘", "ms": "stering" }, "sentences": { "en": "Hold the steering wheel firmly.", "cn": "紧握方向盘。", "ms": "Pegang stering dengan kemas." } }
        ],
        "Module 7: Helping out": [
            { "word": "torch", "hint": "A small electric light you can hold in your hand.", "translations": { "cn": "手电筒", "ms": "lampu suluh" }, "sentences": { "en": "Use a torch to see in the dark.", "cn": "用手电筒在黑暗中看东西。", "ms": "Gunakan lampu suluh untuk melihat dalam gelap." } },
            { "word": "tent", "hint": "A shelter made of cloth used for sleeping outside when camping.", "translations": { "cn": "帐篷", "ms": "khemah" }, "sentences": { "en": "We slept in a tent during our camping trip.", "cn": "露营期间我们睡在帐篷里。", "ms": "Kami tidur di dalam khemah semasa perkhemahan." } },
            { "word": "squirrel", "hint": "A small animal with a bushy tail that climbs trees.", "translations": { "cn": "松鼠", "ms": "tupai" }, "sentences": { "en": "The squirrel is gathering nuts.", "cn": "松鼠正在收集坚果。", "ms": "Tupai itu sedang mengumpul kacang." } },
            { "word": "peanut", "hint": "A small nut that monkeys and elephants like to eat.", "translations": { "cn": "花生", "ms": "kacang tanah" }, "sentences": { "en": "Elephants love to eat peanuts.", "cn": "大象喜欢吃花生。", "ms": "Gajah sangat suka makan kacang tanah." } },
            { "word": "rubbish", "hint": "Things you throw away into the dustbin.", "translations": { "cn": "垃圾", "ms": "sampah" }, "sentences": { "en": "Don't throw rubbish on the street.", "cn": "不要在街上扔垃圾。", "ms": "Jangan buang sampah di jalan raya." } },
            { "word": "plastic", "hint": "A material used to make bottles and bags.", "translations": { "cn": "塑料", "ms": "plastik" }, "sentences": { "en": "Recycle plastic bottles to save the environment.", "cn": "回收塑料瓶以保护环境。", "ms": "Kitar semula botol plastik untuk menyelamatkan alam sekitar." } },
            { "word": "recycle", "hint": "To treat things that have already been used so that they can be used again.", "translations": { "cn": "回收", "ms": "kitar semula" }, "sentences": { "en": "We should recycle paper and glass.", "cn": "我们应该回收纸张和玻璃。", "ms": "Kita harus mengitar semula kertas dan kaca." } },
            { "word": "sleeping", "hint": "Resting with your eyes closed in a bag when camping.", "translations": { "cn": "睡觉", "ms": "tidur" }, "sentences": { "en": "He is sleeping inside his warm sleeping bag.", "cn": "他正睡在温暖的睡袋里。", "ms": "Dia sedang tidur di dalam beg tidur yang hangat." } },
            { "word": "campfire", "hint": "An outdoor fire for cooking and keeping warm.", "translations": { "cn": "营火", "ms": "unggun api" }, "sentences": { "en": "We sang songs around the campfire.", "cn": "我们在营火旁唱歌。", "ms": "Kami menyanyi lagu di sekeliling unggun api." } },
            { "word": "mosquito", "hint": "An insect that bites you and sucks blood.", "translations": { "cn": "蚊子", "ms": "nyamuk" }, "sentences": { "en": "Wear repellant to keep mosquitoes away.", "cn": "涂上驱虫剂以远离蚊子。", "ms": "Pakai ubat nyamuk untuk menjauhkan nyamuk." } }
        ],
        "Module 8: Amazing animals": [
            { "word": "dinosaur", "hint": "A giant reptile that lived a very long time ago.", "translations": { "cn": "恐龙", "ms": "dinosaur" }, "sentences": { "en": "The T-Rex was a fierce dinosaur.", "cn": "霸王龙是一种凶猛的恐龙。", "ms": "T-Rex ialah dinosaur yang sangat garang." } },
            { "word": "gorilla", "hint": "A very large, strong ape.", "translations": { "cn": "大猩猩", "ms": "gorila" }, "sentences": { "en": "The gorilla is a powerful primate.", "cn": "大猩猩是一种强大的灵长类动物。", "ms": "Gorila ialah primat yang mempunyai tenaga kuat." } },
            { "word": "panda", "hint": "A large black and white bear from China.", "translations": { "cn": "熊猫", "ms": "panda" }, "sentences": { "en": "The panda eats bamboo stems.", "cn": "熊猫吃竹竿。", "ms": "Panda makan batang buluh." } },
            { "word": "rhino", "hint": "A large, heavy animal with a horn on its nose.", "translations": { "cn": "犀牛", "ms": "badak sumsum" }, "sentences": { "en": "The rhino has thick gray skin.", "cn": "犀牛有厚厚的灰色皮肤。", "ms": "Badak sumsum mempunyai kulit kelabu yang tebal." } },
            { "word": "heavy", "hint": "Weighing a lot; difficult to lift.", "translations": { "cn": "重", "ms": "berat" }, "sentences": { "en": "This big box is too heavy for me.", "cn": "这个大箱子对我来说太重了。", "ms": "Kotak besar ini terlalu berat untuk saya." } },
            { "word": "strong", "hint": "Having a lot of physical power.", "translations": { "cn": "强壮", "ms": "kuat" }, "sentences": { "en": "Elephants are very strong animals.", "cn": "大象是非常强壮的动物。", "ms": "Gajah ialah haiwan yang sangat kuat." } },
            { "word": "fierce", "hint": "Very aggressive, angry or dangerous.", "translations": { "cn": "凶猛", "ms": "garang" }, "sentences": { "en": "A tiger is a fierce predator.", "cn": "老虎是凶猛的捕食者。", "ms": "Harimau ialah pemangsa yang garang." } },
            { "word": "scary", "hint": "Making you feel frightened.", "translations": { "cn": "可怕", "ms": "menakutkan" }, "sentences": { "en": "The spider looked quite scary.", "cn": "那只蜘蛛看起来相当可怕。", "ms": "Lelabah itu kelihatan agak menakutkan." } },
            { "word": "extinct", "hint": "A type of animal that does not exist anymore.", "translations": { "cn": "灭绝", "ms": "pupus" }, "sentences": { "en": "Mammoths are now extinct.", "cn": "猛犸象现在已经灭绝了。", "ms": "Mamot kini sudah pupus." } },
            { "word": "museum", "hint": "A place where you can see dinosaur skeletons.", "translations": { "cn": "博物馆", "ms": "muzium" }, "sentences": { "en": "We saw a giant dinosaur at the museum.", "cn": "我们在博物馆看到了一只巨大的恐龙。", "ms": "Kami melihat dinosaur gergasi di muzium." } }
        ],
        "Module 9: Get active!": [
            { "word": "javelin", "hint": "A long spear you throw in sports.", "translations": { "cn": "标枪", "ms": "rejam lembing" }, "sentences": { "en": "Throwing the javelin requires technique.", "cn": "掷标枪需要技巧。", "ms": "Merejam lembing memerlukan teknik." } },
            { "word": "cycling", "hint": "The sport of riding a bicycle.", "translations": { "cn": "自行车运动/骑行", "ms": "berbasikal" }, "sentences": { "en": "Cycling is good exercise for legs.", "cn": "骑自行车对腿部锻炼很好。", "ms": "Berbasikal ialah senaman yang baik untuk kaki." } },
            { "word": "champion", "hint": "The winner of a competition or sport.", "translations": { "cn": "冠军", "ms": "juara" }, "sentences": { "en": "He became the state swimming champion.", "cn": "他成了州游泳冠军。", "ms": "Dia telah menjadi juara renang negeri." } },
            { "word": "athlete", "hint": "A person who is very good at sports.", "translations": { "cn": "运动员", "ms": "atlet" }, "sentences": { "en": "The athlete trained hard for the race.", "cn": "这位运动员为比赛刻苦训练。", "ms": "Atlet itu berlatih bersungguh-sungguh untuk perlumbaan." } },
            { "word": "court", "hint": "A place where you play tennis or badminton.", "translations": { "cn": "球场", "ms": "gelanggang" }, "sentences": { "en": "Let's meet at the badminton court.", "cn": "我们在羽毛球场见吧。", "ms": "Mari kita berjumpa di gelanggang badminton." } },
            { "word": "gymnastics", "hint": "A sport involving jumping, balancing, and tumbling.", "translations": { "cn": "体操", "ms": "gimnastik" }, "sentences": { "en": "She practiced her gymnastics routine.", "cn": "她练习了她的体操动作。", "ms": "Dia berlatih rutin gimnastiknya." } },
            { "word": "swimming", "hint": "Racing in the water.", "translations": { "cn": "游泳", "ms": "berenang" }, "sentences": { "en": "He won a gold medal for swimming.", "cn": "他获得了游泳金牌。", "ms": "Dia memenangi pingat emas dalam acara berenang." } },
            { "word": "race", "hint": "A competition to see who is the fastest.", "translations": { "cn": "比赛/赛跑", "ms": "perlumbaan" }, "sentences": { "en": "The 100-meter race was exciting.", "cn": "100米赛跑非常刺激。", "ms": "Perlumbaan 100 meter itu sangat menarik." } },
            { "word": "winner", "hint": "The person who gets first place.", "translations": { "cn": "赢家/冠军", "ms": "pemenang" }, "sentences": { "en": "The winner received a trophy.", "cn": "赢家获得了一座奖杯。", "ms": "Pemenang menerima sebuah trofi." } },
            { "word": "medal", "hint": "A gold, silver, or bronze award for winning.", "translations": { "cn": "奖牌", "ms": "pingat" }, "sentences": { "en": "Hang the medal around your neck.", "cn": "把奖牌挂在你的脖子上。", "ms": "Gantung pingat itu di leher anda." } }
        ],
        "Module 10: What's the matter?": [
            { "word": "headache", "hint": "When your head hurts a lot.", "translations": { "cn": "头疼", "ms": "sakit kepala" }, "sentences": { "en": "I have a bad headache today.", "cn": "我今天头疼得很厉害。", "ms": "Saya mengalami sakit kepala yang teruk hari ini." } },
            { "word": "stomachache", "hint": "When your tummy hurts.", "translations": { "cn": "肚子疼/胃疼", "ms": "sakit perut" }, "sentences": { "en": "Eating too much candy gave him a stomachache.", "cn": "吃太多糖让他肚子疼。", "ms": "Makan terlalu banyak gula-gula menyebabkan dia sakit perut." } },
            { "word": "toothache", "hint": "When your tooth hurts.", "translations": { "cn": "牙痛", "ms": "sakit gigi" }, "sentences": { "en": "He needs to see a dentist for his toothache.", "cn": "他因为牙痛需要去看牙医。", "ms": "Dia perlu berjumpa doktor gigi untuk sakit giginya." } },
            { "word": "medicine", "hint": "What the doctor gives you to drink or swallow when you are sick.", "translations": { "cn": "药物", "ms": "ubat" }, "sentences": { "en": "Take your medicine after lunch.", "cn": "午饭后吃药。", "ms": "Makan ubat anda selepas makan tengah hari." } },
            { "word": "plaster", "hint": "A sticky strip you put on a small cut.", "translations": { "cn": "创口贴", "ms": "plaster" }, "sentences": { "en": "The nurse put a plaster on my finger.", "cn": "护士在我的手指上贴了创口贴。", "ms": "Jururawat meletakkan plaster pada jari saya." } },
            { "word": "fever", "hint": "When your body temperature is too hot.", "translations": { "cn": "发烧", "ms": "demam" }, "sentences": { "en": "Drink plenty of water when you have a fever.", "cn": "发烧时要多喝水。", "ms": "Minum banyak air apabila anda demam." } },
            { "word": "sore", "hint": "Painful to touch.", "translations": { "cn": "疼痛/酸痛", "ms": "sakit/perit" }, "sentences": { "en": "My throat is very sore today.", "cn": "我今天喉咙很痛。", "ms": "Tekak saya sangat perit hari ini." } },
            { "word": "throat", "hint": "The inside of your neck where you swallow food.", "translations": { "cn": "喉咙", "ms": "tekak" }, "sentences": { "en": "I have a dry throat.", "cn": "我喉咙很干。", "ms": "Tekak saya terasa kering." } },
            { "word": "cough", "hint": "A loud sound from your throat when you are sick.", "translations": { "cn": "咳嗽", "ms": "batuk" }, "sentences": { "en": "The baby has a bad cough.", "cn": "宝宝咳嗽得很厉害。", "ms": "Bayi itu mengalami batuk yang teruk." } },
            { "word": "swallow", "hint": "Making food or drink go down your throat.", "translations": { "cn": "吞咽", "ms": "menelan" }, "sentences": { "en": "Drink some water to help you swallow.", "cn": "喝点水帮你吞咽。", "ms": "Minum sedikit air untuk membantu anda menelan." } }
        ]
    },
    "5": {
        "Unit 1: Towns and cities": [
            { "word": "library", "hint": "A quiet place to borrow books.", "translations": { "cn": "图书馆", "ms": "perpustakaan" }, "sentences": { "en": "The school library has a large collection of books.", "cn": "学校图书馆收藏了大量的书籍。", "ms": "Perpustakaan sekolah mempunyai koleksi buku yang banyak." } },
            { "word": "monument", "hint": "A statue or building erected to remember a famous person.", "translations": { "cn": "纪念碑/纪念馆", "ms": "monumen" }, "sentences": { "en": "The war monument stands in the town square.", "cn": "战争纪念碑矗立在城镇广场上。", "ms": "Monumen perang itu tersergam di dataran bandar." } },
            { "word": "square", "hint": "An open area in a town, often with a fountain or statue.", "translations": { "cn": "广场", "ms": "dataran" }, "sentences": { "en": "Many people gather in the town square.", "cn": "许多人聚集在城镇广场上。", "ms": "Ramai orang berkumpul di dataran bandar." } },
            { "word": "bridge", "hint": "A structure built to cross over a river or road.", "translations": { "cn": "桥梁", "ms": "jambatan" }, "sentences": { "en": "The bridge connects the two sides of the river.", "cn": "这座桥连接着河流的两岸。", "ms": "Jambatan itu menghubungkan kedua-dua belah sungai." } },
            { "word": "cinema", "hint": "A place where you watch movies.", "translations": { "cn": "电影院", "ms": "pawagam" }, "sentences": { "en": "We watched the latest blockbuster at the cinema.", "cn": "我们在电影院看了最新的大片。", "ms": "Kami menonton filem pecah panggung terbaru di pawagam." } },
            { "word": "theatre", "hint": "A place where you watch actors perform on a stage.", "translations": { "cn": "剧院", "ms": "teater" }, "sentences": { "en": "The play was performed at the local theatre.", "cn": "这场戏是在当地剧院演出的。", "ms": "Pementasan itu diadakan di teater tempatan." } },
            { "word": "factory", "hint": "A large building where things are manufactured.", "translations": { "cn": "工厂", "ms": "kilang" }, "sentences": { "en": "The car factory employs many local workers.", "cn": "这家汽车厂雇佣了许多当地工人。", "ms": "Kilang kereta itu menggaji ramai pekerja tempatan." } },
            { "word": "market", "hint": "An open place where people buy and sell fresh food.", "translations": { "cn": "市场", "ms": "pasar" }, "sentences": { "en": "I buy fresh vegetables from the wet market.", "cn": "我从菜市场买新鲜蔬菜。", "ms": "Saya membeli sayur-sayuran segar dari pasar awam." } },
            { "word": "station", "hint": "A place where trains or buses stop for passengers.", "translations": { "cn": "站/车站", "ms": "stesen" }, "sentences": { "en": "The train arrived at the station on time.", "cn": "火车按时到达了车站。", "ms": "Kereta api itu tiba di stesen tepat pada waktunya." } },
            { "word": "restaurant", "hint": "A place where you order and pay for a meal.", "translations": { "cn": "餐厅", "ms": "restoran" }, "sentences": { "en": "We had a delicious family dinner at the restaurant.", "cn": "我们在餐厅吃了一顿美味的家庭晚餐。", "ms": "Kami makan malam keluarga yang sedap di restoran." } }
        ],
        "Unit 2: Days": [
            { "word": "routine", "hint": "The normal order and way in which you do things every day.", "translations": { "cn": "日常/常规", "ms": "rutin" }, "sentences": { "en": "A daily routine helps you manage your time.", "cn": "日常生活习惯可以帮助你管理时间。", "ms": "Rutin harian membantu anda menguruskan masa." } },
            { "word": "housework", "hint": "Cleaning and organizing tasks done at home.", "translations": { "cn": "家务", "ms": "kerja rumah/kerja-kerja rumah" }, "sentences": { "en": "I help my mother with the housework on weekends.", "cn": "我周末帮妈妈做家务。", "ms": "Saya membantu ibu membuat kerja rumah pada hujung minggu." } },
            { "word": "relax", "hint": "To rest and be calm after working hard.", "translations": { "cn": "放松", "ms": "berehat/bersantai" }, "sentences": { "en": "I like to relax by reading a book.", "cn": "我喜欢通过读书来放松。", "ms": "Saya suka bersantai dengan membaca buku." } },
            { "word": "practice", "hint": "Doing something repeatedly to get better at it.", "translations": { "cn": "练习", "ms": "berlatih/praktis" }, "sentences": { "en": "Persistent practice leads to excellence.", "cn": "坚持练习才能出类拔萃。", "ms": "Latihan yang berterusan membawa kepada kecemerlangan." } },
            { "word": "breakfast", "hint": "The morning meal.", "translations": { "cn": "早餐", "ms": "sarapan" }, "sentences": { "en": "Breakfast is the most important meal of the day.", "cn": "早餐是一天中最重要的一餐。", "ms": "Sarapan ialah hidangan yang paling penting dalam sehari." } },
            { "word": "evening", "hint": "The part of the day before night comes.", "translations": { "cn": "傍晚/晚上", "ms": "waktu petang/malam" }, "sentences": { "en": "The sun sets beautifully in the evening.", "cn": "傍晚的日落非常美丽。", "ms": "Matahari terbenam dengan indah pada waktu petang." } },
            { "word": "weekday", "hint": "Any day of the week from Monday to Friday.", "translations": { "cn": "工作日", "ms": "hari biasa/hari bekerja" }, "sentences": { "en": "Students attend school on weekdays.", "cn": "学生们在工作日上学。", "ms": "Pelajar-pelajar menghadiri sekolah pada hari bekerja." } },
            { "word": "celebrate", "hint": "Doing something enjoyable for a special occasion.", "translations": { "cn": "庆祝", "ms": "menyambut/merayakan" }, "sentences": { "en": "They celebrate their anniversary with a feast.", "cn": "他们举行宴会庆祝周年纪念。", "ms": "Mereka menyambut ulang tahun mereka dengan kenduri." } },
            { "word": "festival", "hint": "A day or period of celebration, usually for cultural reasons.", "translations": { "cn": "节日", "ms": "perayaan" }, "sentences": { "en": "The town hosts a colorful spring festival.", "cn": "小镇举办了一场色彩鲜艳的春季庆典。", "ms": "Pekan itu mengadakan pesta musim bunga yang meriah." } },
            { "word": "calendar", "hint": "A chart showing the days, weeks, and months of the year.", "translations": { "cn": "日历", "ms": "kalendar/takwim" }, "sentences": { "en": "Mark important dates on your calendar.", "cn": "在日历上标记重要的日期。", "ms": "Tandakan tarikh-tarikh penting pada kalendar anda." } }
        ],
        "Unit 3: Wild life": [
            { "word": "camel", "hint": "A large desert animal with humps on its back.", "translations": { "cn": "骆驼", "ms": "unta" }, "sentences": { "en": "The camel trekked across the sand dunes.", "cn": "骆驼在沙丘间跋涉。", "ms": "Unta itu berjalan merentasi gumuk pasir." } },
            { "word": "eagle", "hint": "A large bird of prey with excellent eyesight.", "translations": { "cn": "老鹰", "ms": "burung helang" }, "sentences": { "en": "The eagle soared high above the cliffs.", "cn": "老鹰在高高的悬崖上方翱翔。", "ms": "Burung helang itu terbang tinggi di atas tebing." } },
            { "word": "ostrich", "hint": "A very large bird that can run fast but cannot fly.", "translations": { "cn": "鸵鸟", "ms": "burung unta" }, "sentences": { "en": "An ostrich can run as fast as a car.", "cn": "鸵鸟可以跑得像汽车一样快。", "ms": "Burung unta boleh berlari selaju kereta." } },
            { "word": "scorpion", "hint": "An animal with a sting on its tail.", "translations": { "cn": "蝎子", "ms": "kala jengking" }, "sentences": { "en": "A scorpion uses its stinger for defense.", "cn": "蝎子用毒刺来防御。", "ms": "Kala jengking menggunakan sengatnya untuk pertahanan." } },
            { "word": "spider", "hint": "An eight-legged creature that weaves webs.", "translations": { "cn": "蜘蛛", "ms": "labah-labah" }, "sentences": { "en": "The spider caught a fly in its web.", "cn": "蜘蛛在网里抓到了一只苍蝇。", "ms": "Labah-labah itu menangkap seekor lalat di dalam sarangnya." } },
            { "word": "butterfly", "hint": "A flying insect with colorful wings.", "translations": { "cn": "蝴蝶", "ms": "rama-rama" }, "sentences": { "en": "A beautiful butterfly landed on the flower.", "cn": "一只美丽的蝴蝶落在了花朵上。", "ms": "Seekor rama-rama yang cantik hinggap di atas bunga itu." } },
            { "word": "crocodile", "hint": "A large, dangerous reptile that lives in rivers.", "translations": { "cn": "鳄鱼", "ms": "buaya" }, "sentences": { "en": "Watch out for the crocodile near the riverbank.", "cn": "当心河岸附近的鳄鱼。", "ms": "Hati-hati dengan buaya di tepi sungai." } },
            { "word": "elephant", "hint": "The largest land animal, with a trunk.", "translations": { "cn": "大象", "ms": "gajah" }, "sentences": { "en": "The elephant used its trunk to lift the log.", "cn": "大象用象鼻抬起木头。", "ms": "Gajah menggunakan belalainya untuk mengangkat balak itu." } },
            { "word": "frog", "hint": "A jumping amphibian.", "translations": { "cn": "青蛙", "ms": "katak" }, "sentences": { "en": "The frog croaked loudly in the pond.", "cn": "青蛙在池塘里大声呱呱叫。", "ms": "Katak itu berbunyi dengan kuat di dalam kolam." } },
            { "word": "giraffe", "hint": "A very tall animal with a long neck.", "translations": { "cn": "长颈鹿", "ms": "zirafah" }, "sentences": { "en": "The giraffe can reach the topmost leaves.", "cn": "长颈鹿可以够到最高的叶子。", "ms": "Zirafah boleh mencapai daun-daun yang paling tinggi." } }
        ],
        "Unit 4: Learning world": [
            { "word": "strict", "hint": "A teacher who demands that rules are followed perfectly.", "translations": { "cn": "严厉", "ms": "tegas/garang" }, "sentences": { "en": "The strict teacher expects full attention.", "cn": "这位严厉的老师要求全神贯注。", "ms": "Guru yang tegas itu mahukan tumpuan sepenuhnya." } },
            { "word": "genius", "hint": "A person who is exceptionally intelligent.", "translations": { "cn": "天才", "ms": "genius" }, "sentences": { "en": "The young student is a mathematical genius.", "cn": "这位年轻的学生是个数学天才。", "ms": "Pelajar muda itu ialah seorang genius matematik." } },
            { "word": "timetable", "hint": "A chart showing when different classes happen.", "translations": { "cn": "课程表", "ms": "jadual waktu" }, "sentences": { "en": "Our timetable changes every semester.", "cn": "我们的课程表每学期都会变。", "ms": "Jadual waktu kami berubah setiap semester." } },
            { "word": "geography", "hint": "The study of the earth, countries, and maps.", "translations": { "cn": "地理", "ms": "geografi" }, "sentences": { "en": "We study world maps in geography class.", "cn": "我们在地理课上研究世界地图。", "ms": "Kami mengkaji peta dunia dalam kelas geografi." } },
            { "word": "history", "hint": "The study of past events.", "translations": { "cn": "历史", "ms": "sejarah" }, "sentences": { "en": "History helps us understand our origins.", "cn": "历史帮助我们了解我们的起源。", "ms": "Sejarah membantu kita memahami asal-usul kita." } },
            { "word": "uniform", "hint": "Special clothes all students wear to school.", "translations": { "cn": "校服/制服", "ms": "pakaian seragam/uniform" }, "sentences": { "en": "All students must wear the proper school uniform.", "cn": "所有学生必须穿好校服。", "ms": "Semua pelajar mesti memakai pakaian seragam sekolah yang betul." } },
            { "word": "boarding", "hint": "A type of school where students live and sleep.", "translations": { "cn": "寄宿", "ms": "berasrama" }, "sentences": { "en": "He attends a famous boarding school.", "cn": "他在一所著名的寄宿学校上学。", "ms": "Dia menghadiri sekolah berasrama yang terkenal." } },
            { "word": "private", "hint": "A school you have to pay a lot of money to attend.", "translations": { "cn": "私立/私人", "ms": "swasta" }, "sentences": { "en": "A private tutor provides one-on-one lessons.", "cn": "私人教师提供一对一的课程。", "ms": "Tutor swasta menyediakan pelajaran secara individu." } },
            { "word": "language", "hint": "The system of words used by people to communicate.", "translations": { "cn": "语言", "ms": "bahasa" }, "sentences": { "en": "Learning a new language is very rewarding.", "cn": "学习一门新语言是非常有益的。", "ms": "Belajar bahasa baharu adalah sangat bermanfaat." } },
            { "word": "notebook", "hint": "A book with blank pages for writing notes.", "translations": { "cn": "笔记本", "ms": "buku nota" }, "sentences": { "en": "Write the key points in your notebook.", "cn": "在笔记本上记下重点。", "ms": "Tuliskan isi-isi penting di dalam buku nota anda." } }
        ],
        "Unit 5: Food and health": [
            { "word": "burger", "hint": "Meat inside a round bun.", "translations": { "cn": "汉堡", "ms": "burger" }, "sentences": { "en": "A chicken burger is his favorite meal.", "cn": "鸡肉汉堡是他最喜欢的餐点。", "ms": "Burger ayam ialah hidangan kegemarannya." } },
            { "word": "chips", "hint": "Long, fried pieces of potato.", "translations": { "cn": "薯条", "ms": "kentang goreng/cip" }, "sentences": { "en": "Fish and chips is a classic dish.", "cn": "炸鱼薯条是一道经典菜肴。", "ms": "Ikan dan kentang goreng ialah hidangan klasik." } },
            { "word": "apples", "hint": "Round, red or green crunchy fruits.", "translations": { "cn": "苹果", "ms": "buah epal" }, "sentences": { "en": "Crunchy red apples are very sweet.", "cn": "香脆的红苹果非常甜。", "ms": "Buah epal merah yang rangup sangat manis." } },
            { "word": "beans", "hint": "Small seeds from plants often eaten as vegetables.", "translations": { "cn": "豆类", "ms": "kacang" }, "sentences": { "en": "Green beans are full of fiber.", "cn": "绿豆含有丰富的纤维。", "ms": "Kacang hijau kaya dengan serat." } },
            { "word": "pasta", "hint": "Italian food made from dough, like spaghetti.", "translations": { "cn": "面食/意大利面", "ms": "pasta" }, "sentences": { "en": "She cooked creamy pasta for dinner.", "cn": "她晚饭做了奶油面。", "ms": "Dia memasak pasta berkrim untuk makan malam." } },
            { "word": "sweets", "hint": "Small sugary treats.", "translations": { "cn": "糖果", "ms": "gula-gula/manisan" }, "sentences": { "en": "Don't eat too many sweets at once.", "cn": "不要一次吃太多的甜食。", "ms": "Jangan makan terlalu banyak gula-gula dalam satu masa." } },
            { "word": "vegetarian", "hint": "A person who does not eat meat.", "translations": { "cn": "素食者", "ms": "vegetarian/penyayang tumbuhan" }, "sentences": { "en": "A vegetarian diet consists of plants.", "cn": "素食饮食由植物组成。", "ms": "Diet vegetarian terdiri daripada tumbuh-tumbuhan." } },
            { "word": "vitamin", "hint": "Healthy substances in food that keep your body working.", "translations": { "cn": "维生素", "ms": "vitamin" }, "sentences": { "en": "Fruit is a great source of vitamins.", "cn": "水果是维生素的重要来源。", "ms": "Buah-buahan ialah sumber vitamin yang hebat." } },
            { "word": "thirsty", "hint": "Feeling that you need to drink water.", "translations": { "cn": "口渴", "ms": "dahaga/haus" }, "sentences": { "en": "Exercise makes me very thirsty.", "cn": "运动让我口渴得厉害。", "ms": "Bersenam membuatkan saya sangat dahaga." } },
            { "word": "active", "hint": "Moving around a lot, participating in sports or exercise.", "translations": { "cn": "活跃", "ms": "aktif" }, "sentences": { "en": "Keeping active is important for health.", "cn": "保持活跃对健康很重要。", "ms": "Kekal aktif adalah penting untuk kesihatan." } }
        ],
        "Unit 6: Sport": [
            { "word": "champion", "hint": "The ultimate winner of a competition.", "translations": { "cn": "冠军", "ms": "juara" }, "sentences": { "en": "The world champion received a gold medal.", "cn": "世界冠军获得了一枚金牌。", "ms": "Juara dunia itu menerima pingat emas." } },
            { "word": "match", "hint": "A game or sporting event.", "translations": { "cn": "比赛", "ms": "perlawanan" }, "sentences": { "en": "The football match ended in a draw.", "cn": "足球赛以平局结束。", "ms": "Perlawanan bola sepak itu berakhir dengan keputusan seri." } },
            { "word": "tournament", "hint": "A series of matches to find an overall winner.", "translations": { "cn": "锦标赛/联赛", "ms": "kejohanan" }, "sentences": { "en": "Our team entered the state tournament.", "cn": "我们的团队参加了州锦标赛。", "ms": "Pasukan kami menyertai kejohanan peringkat negeri." } },
            { "word": "stadium", "hint": "A large, open building with seats for watching sports.", "translations": { "cn": "体育场", "ms": "stadium" }, "sentences": { "en": "The national stadium was packed with fans.", "cn": "国家体育场挤满了球迷。", "ms": "Stadium nasional itu penuh dengan peminat." } },
            { "word": "player", "hint": "A person who takes part in a sport.", "translations": { "cn": "运动员/选手", "ms": "pemain" }, "sentences": { "en": "He is a talented basketball player.", "cn": "他是一位很有天赋的篮球运动员。", "ms": "Dia ialah seorang pemain bola keranjang yang berbakat." } },
            { "word": "coach", "hint": "The person who trains athletes or a team.", "translations": { "cn": "教练", "ms": "jurulatih" }, "sentences": { "en": "The coach gave us a pep talk.", "cn": "教练给我们做了一场鼓舞人心的讲话。", "ms": "Jurulatih itu memberikan kata-kata semangat kepada kami." } },
            { "word": "compete", "hint": "Trying to win against others in a game or race.", "translations": { "cn": "竞争/比赛", "ms": "bersaing/bertanding" }, "sentences": { "en": "Athletes from many countries compete in the Olympics.", "cn": "来自许多国家的运动员在奥运会上竞技。", "ms": "Atlet dari banyak negara bersaing dalam Sukan Olimpik." } },
            { "word": "sponsor", "hint": "A company that pays money to support a team.", "translations": { "cn": "赞助商", "ms": "penaja" }, "sentences": { "en": "The local bank is our team sponsor.", "cn": "当地银行是我们队的赞助商。", "ms": "Bank tempatan ialah penaja pasukan kami." } },
            { "word": "trophy", "hint": "A large cup given as a prize for winning.", "translations": { "cn": "奖杯", "ms": "trofi/piala" }, "sentences": { "en": "The winning team lifted the trophy high.", "cn": "获胜队高高举起了奖杯。", "ms": "Pasukan yang menang menjulang piala itu tinggi-tinggi." } },
            { "word": "victory", "hint": "Winning a game or competition.", "translations": { "cn": "胜利", "ms": "kemenangan" }, "sentences": { "en": "The hard-earned victory was sweet.", "cn": "辛辛苦苦换来的胜利是甜蜜的。", "ms": "Kemenangan yang sukar diperoleh itu amat bermakna." } }
        ],
        "Unit 7: Growing up": [
            { "word": "height", "hint": "How tall someone is.", "translations": { "cn": "高度/身高", "ms": "ketinggian" }, "sentences": { "en": "Measure your height against the wall.", "cn": "靠墙量一下你的身高。", "ms": "Ukur ketinggian anda pada dinding." } },
            { "word": "weight", "hint": "How heavy someone is.", "translations": { "cn": "重量/体重", "ms": "berat badan" }, "sentences": { "en": "Record your weight every month.", "cn": "每个月记录你的体重。", "ms": "Catat berat badan anda setiap bulan." } },
            { "word": "toddler", "hint": "A very young child who is just learning to walk.", "translations": { "cn": "幼儿", "ms": "kanak-kanak kecil" }, "sentences": { "en": "The toddler is taking her first steps.", "cn": "这个幼儿正在迈出她的第一步。", "ms": "Kanak-kanak kecil itu sedang belajar berjalan." } },
            { "word": "infant", "hint": "A baby.", "translations": { "cn": "婴儿", "ms": "bayi" }, "sentences": { "en": "An infant requires a lot of care.", "cn": "婴儿需要很多的照顾。", "ms": "Seorang bayi memerlukan banyak penjagaan." } },
            { "word": "adult", "hint": "A fully grown person.", "translations": { "cn": "成年人", "ms": "dewasa" }, "sentences": { "en": "Adults have more responsibilities.", "cn": "成年人有更多的责任。", "ms": "Orang dewasa mempunyai lebih banyak tanggungjawab." } },
            { "word": "teenager", "hint": "A young person between 13 and 19 years old.", "translations": { "cn": "青少年", "ms": "remaja" }, "sentences": { "en": "She became a teenager last month.", "cn": "她上个月成了一名青少年。", "ms": "Dia telah menjadi seorang remaja pada bulan lepas." } },
            { "word": "elderly", "hint": "A polite word for old people.", "translations": { "cn": "老人", "ms": "warga emas" }, "sentences": { "en": "We should always respect the elderly.", "cn": "我们应该永远尊敬老人。", "ms": "Kita harus sentiasa menghormati warga emas." } },
            { "word": "generation", "hint": "All the people born around the same time.", "translations": { "cn": "一代人", "ms": "generasi" }, "sentences": { "en": "The younger generation is tech-savvy.", "cn": "年轻一代精通技术。", "ms": "Generasi muda sangat mahir teknologi." } },
            { "word": "memory", "hint": "Something you remember from the past.", "translations": { "cn": "记忆", "ms": "ingatan/memori" }, "sentences": { "en": "I have a sharp memory for names.", "cn": "我对名字的记忆力很敏锐。", "ms": "Saya mempunyai ingatan yang tajam tentang nama." } },
            { "word": "childhood", "hint": "The time of your life when you are a kid.", "translations": { "cn": "童年", "ms": "zaman kanak-kanak" }, "sentences": { "en": "Playing by the river was a happy childhood memory.", "cn": "在河边玩耍是一段快乐的童年记忆。", "ms": "Bermain di tepi sungai ialah kenangan zaman kanak-kanak yang gembira." } }
        ],
        "Unit 8: Going away": [
            { "word": "suitcase", "hint": "A large bag for carrying clothes when travelling.", "translations": { "cn": "行李箱", "ms": "beg pakaian/beg balik kampung" }, "sentences": { "en": "Pack your clothes neatly in the suitcase.", "cn": "把衣服整齐地装进手提箱里。", "ms": "Kemas pakaian anda dengan rapi di dalam beg pakaian." } },
            { "word": "passport", "hint": "An official document needed to travel to other countries.", "translations": { "cn": "护照", "ms": "pasport" }, "sentences": { "en": "Don't forget to bring your passport to the airport.", "cn": "别忘了带护照去机场。", "ms": "Jangan lupa bawa pasport anda ke lapangan terbang." } },
            { "word": "ticket", "hint": "A piece of paper needed to board a plane or train.", "translations": { "cn": "票/机票", "ms": "tiket" }, "sentences": { "en": "You need a valid ticket to travel.", "cn": "旅行需要有效的票。", "ms": "Anda memerlukan tiket yang sah untuk mengembara." } },
            { "word": "luggage", "hint": "All the bags and suitcases you take on a trip.", "translations": { "cn": "行李", "ms": "bagasi" }, "sentences": { "en": "The porter helped us with our heavy luggage.", "cn": "搬运工帮我们搬运沉重的行李。", "ms": "Porter itu membantu kami dengan bagasi yang berat." } },
            { "word": "airport", "hint": "The place where you go to catch an airplane.", "translations": { "cn": "机场", "ms": "lapangan terbang" }, "sentences": { "en": "We arrived at the airport two hours early.", "cn": "我们提前两个小时到达了机场。", "ms": "Kami tiba di lapangan terbang dua jam lebih awal." } },
            { "word": "departure", "hint": "Leaving a place to go on a journey.", "translations": { "cn": "离境", "ms": "berlepas" }, "sentences": { "en": "The departure of the flight was delayed.", "cn": "航班起飞被延迟了。", "ms": "Waktu berlepas penerbangan itu telah ditunda." } },
            { "word": "arrival", "hint": "Reaching your destination.", "translations": { "cn": "到达", "ms": "ketibaan" }, "sentences": { "en": "Wait in the arrival hall for your friends.", "cn": "在到达大厅等候你的朋友。", "ms": "Tunggu di balai ketibaan untuk kawan-kawan anda." } },
            { "word": "passenger", "hint": "A person traveling in a vehicle, plane, or ship.", "translations": { "cn": "乘客", "ms": "penumpang" }, "sentences": { "en": "The bus was full of happy passengers.", "cn": "公共汽车上坐满了快乐的乘客。", "ms": "Bas itu penuh dengan penumpang yang gembira." } },
            { "word": "flight", "hint": "A journey made by air.", "translations": { "cn": "飞行/航班", "ms": "penerbangan" }, "sentences": { "en": "The international flight across the ocean was long.", "cn": "飞越海洋的国际航班很漫长。", "ms": "Penerbangan antarabangsa merentasi lautan itu sangat lama." } },
            { "word": "holiday", "hint": "A period of rest and travel away from school or work.", "translations": { "cn": "假/假日", "ms": "cuti/percutian" }, "sentences": { "en": "We are going to the mountains for our holiday.", "cn": "我们要去山里度假。", "ms": "Kami akan pergi ke kawasan pergunungan untuk percutian kami." } }
        ]
    },
    "6": {
        "Unit 1: It's an emergency!": [
            { "word": "power", "hint": "Electricity that makes lights and machines work.", "translations": { "cn": "电力/电源", "ms": "kuasa/tenaga elektrik" }, "sentences": { "en": "The storm caused a major power outage.", "cn": "风暴造成了大面积停电。", "ms": "Ribut itu menyebabkan gangguan bekalan elektrik yang besar." } },
            { "word": "flashlight", "hint": "A small hand-held electric light.", "translations": { "cn": "手电筒", "ms": "lampu suluh" }, "sentences": { "en": "Keep a flashlight handy for emergencies.", "cn": "备个手电筒以防万一。", "ms": "Simpan lampu suluh berdekatan untuk kecemasan." } },
            { "word": "rescue", "hint": "To save someone from danger.", "translations": { "cn": "营救/救援", "ms": "menyelamat" }, "sentences": { "en": "The rescue team saved the hikers from the mountain.", "cn": "救援队把徒步旅行者从山上救了出来。", "ms": "Pasukan penyelamat menyelamatkan pendaki dari gunung itu." } },
            { "word": "siren", "hint": "A loud warning sound made by an ambulance or police car.", "translations": { "cn": "警笛", "ms": "siren" }, "sentences": { "en": "We heard the wailing siren of an ambulance.", "cn": "我们听到了救护车哀鸣的警笛声。", "ms": "Kami mendengar bunyi siren ambulans yang kuat." } },
            { "word": "accident", "hint": "An unexpected event that causes damage or injury.", "translations": { "cn": "事故", "ms": "kemalangan" }, "sentences": { "en": "Wear a seatbelt to reduce injury in an accident.", "cn": "系好安全带以减少事故中的伤害。", "ms": "Pakai tali pinggang keledar untuk mengurangkan kecederaan dalam kemalangan." } },
            { "word": "ambulance", "hint": "A vehicle that takes sick or injured people to hospital.", "translations": { "cn": "救护车", "ms": "ambulans" }, "sentences": { "en": "The ambulance rushed the patient to the surgical ward.", "cn": "救护车将病人紧急送往手术病房。", "ms": "Ambulans mengejarkan pesakit ke wad pembedahan." } },
            { "word": "survive", "hint": "To stay alive after a dangerous event.", "translations": { "cn": "生存/幸存", "ms": "bertahan hidup/terselamat" }, "sentences": { "en": "Plants need sunlight and water to survive.", "cn": "植物生存需要阳光和水。", "ms": "Tumbuhan memerlukan cahaya matahari dan air untuk bertahan hidup." } },
            { "word": "trapped", "hint": "Stuck and unable to escape.", "translations": { "cn": "被困", "ms": "terperangkap" }, "sentences": { "en": "The kitten was trapped under the porch.", "cn": "小猫被困在门廊下面了。", "ms": "Anak kucing itu terperangkap di bawah anjung." } },
            { "word": "danger", "hint": "The possibility of getting hurt or killed.", "translations": { "cn": "危险", "ms": "bahaya" }, "sentences": { "en": "The red sign warns of immediate danger.", "cn": "红色标志警告有立即的危险。", "ms": "Papan tanda merah itu memberi amaran bahaya serta-merta." } },
            { "word": "safety", "hint": "Being protected from harm.", "translations": { "cn": "安全", "ms": "keselamatan" }, "sentences": { "en": "Safety should be our top priority.", "cn": "安全应该是我们的首要任务。", "ms": "Keselamatan harus menjadi keutamaan kita." } }
        ],
        "Unit 2: Life in the past": [
            { "word": "ancient", "hint": "Relating to a long time ago, like Rome or Egypt.", "translations": { "cn": "古代/古老", "ms": "purba/kuno" }, "sentences": { "en": "Ancient civilizations built massive temples.", "cn": "古代文明建造了巨大的神庙。", "ms": "Tamadun purba membina kuil-kuil yang besar." } },
            { "word": "artifact", "hint": "An object made by a human being, typically one of cultural or historical interest.", "translations": { "cn": "文物/手工制品", "ms": "artifak" }, "sentences": { "en": "The museum displayed a rare gold artifact.", "cn": "博物馆展出了一件罕见的黄金文物。", "ms": "Muzium itu mempamerkan artifak emas yang jarang ditemui." } },
            { "word": "archaeology", "hint": "The study of human history through the excavation of sites.", "translations": { "cn": "考古学", "ms": "arkeologi" }, "sentences": { "en": "Archaeology helps us uncover the secrets of the past.", "cn": "考古学帮助我们揭开过去的秘密。", "ms": "Arkeologi membantu kita mendedahkan rahsia masa lalu." } },
            { "word": "scroll", "hint": "A roll of parchment or paper for writing or painting on.", "translations": { "cn": "卷轴", "ms": "skrol" }, "sentences": { "en": "The priest read from an ancient scroll.", "cn": "祭司读着一卷古代卷轴。", "ms": "Paderi itu membaca daripada sebuah skrol purba." } },
            { "word": "empire", "hint": "A large group of states or countries ruled by a single person.", "translations": { "cn": "帝国", "ms": "empayar" }, "sentences": { "en": "The Roman Empire spanned three continents.", "cn": "罗马帝国横跨三大洲。", "ms": "Empayar Rom merangkumi tiga benua." } },
            { "word": "citizen", "hint": "A legally recognized subject or national of a state.", "translations": { "cn": "公民", "ms": "warganegara" }, "sentences": { "en": "Every citizen has a right to vote.", "cn": "每个公民都有投票权。", "ms": "Setiap warganegara mempunyai hak untuk mengundi." } },
            { "word": "sculpture", "hint": "The art of making two- or three-dimensional abstract or representative forms.", "translations": { "cn": "雕塑", "ms": "arca/ukiran" }, "sentences": { "en": "The marble sculpture was finely detailed.", "cn": "大理石雕塑细节精美。", "ms": "Arca marmar itu mempunyai perincian yang halus." } },
            { "word": "dynasty", "hint": "A line of hereditary rulers of a country.", "translations": { "cn": "王朝", "ms": "dinasti" }, "sentences": { "en": "The Ming Dynasty is famous for its porcelain.", "cn": "明朝以青花瓷闻名。", "ms": "Dinasti Ming terkenal dengan porselinnya." } },
            { "word": "conquest", "hint": "The assumption of control of a place or people by military force.", "translations": { "cn": "征服", "ms": "penaklukan" }, "sentences": { "en": "The Norman conquest changed English history.", "cn": "诺曼征服改变了英国历史。", "ms": "Penaklukan Norman mengubah sejarah Inggeris." } },
            { "word": "fossil", "hint": "The remains or impression of a prehistoric organism preserved in petrified form.", "translations": { "cn": "化石", "ms": "fosil" }, "sentences": { "en": "Scientists found a dinosaur fossil in the desert.", "cn": "科学家在沙漠里发现了考龙化石。", "ms": "Ahli sains menemui fosil dinosaur di padang pasir." } }
        ],
        "Unit 3: Adventure time": [
            { "word": "explore", "hint": "Travel through an unfamiliar area to learn about it.", "translations": { "cn": "探索", "ms": "meneroka" }, "sentences": { "en": "We want to explore the mysterious cave.", "cn": "我们想探索那个神秘的洞穴。", "ms": "Kami mahu meneroka gua yang misteri itu." } },
            { "word": "journey", "hint": "An act of traveling from one place to another.", "translations": { "cn": "旅程", "ms": "perjalanan" }, "sentences": { "en": "The long journey across the desert was exhausting.", "cn": "横跨沙漠的长途旅行非常劳累。", "ms": "Perjalanan jauh merentasi padang pasir itu sangat meletihkan." } },
            { "word": "survival", "hint": "The state or fact of continuing to live or exist, typically in spite of an accident.", "translations": { "cn": "生存/生还", "ms": "kemandirian/kelangsungan hidup" }, "sentences": { "en": "Survival skills are important for hikers.", "cn": "生存技能对徒步旅行者很重要。", "ms": "Kemahiran kemandirian adalah penting bagi pendaki." } },
            { "word": "wilderness", "hint": "An uncultivated, uninhabited, and inhospitable region.", "translations": { "cn": "荒野/荒地", "ms": "belantara" }, "sentences": { "en": "They spent a week in the Alaskan wilderness.", "cn": "他们在阿拉斯加荒野里呆了一周。", "ms": "Mereka menghabiskan seminggu di belantara Alaska." } },
            { "word": "navigation", "hint": "The process or activity of accurately ascertaining one's position.", "translations": { "cn": "导航/航行", "ms": "navigasi" }, "sentences": { "en": "The captain used a compass for navigation.", "cn": "船长使用指南针进行导航。", "ms": "Kapten itu menggunakan kompas untuk navigasi." } },
            { "word": "shelter", "hint": "A place giving temporary protection from bad weather or danger.", "translations": { "cn": "避难所/庇护所", "ms": "tempat perlindungan" }, "sentences": { "en": "We built a temporary shelter from branches.", "cn": "我们用树枝搭了一个临时避难所。", "ms": "Kami membina tempat perlindungan sementara daripada dahan kayu." } },
            { "word": "expedition", "hint": "A journey undertaken by a group of people with a particular purpose.", "translations": { "cn": "远征/探险队", "ms": "ekspedisi" }, "sentences": { "en": "The mountain expedition reached the summit.", "cn": "登山探险队到达了顶峰。", "ms": "Ekspedisi gunung itu sampai ke puncak." } },
            { "word": "courage", "hint": "The ability to do something that frightens one.", "translations": { "cn": "勇气", "ms": "keberanian" }, "sentences": { "en": "It takes courage to face your fears.", "cn": "面对恐惧需要勇气。", "ms": "Ia memerlukan keberanian untuk menghadapi ketakutan anda." } },
            { "word": "compass", "hint": "An instrument containing a magnetized pointer which shows the direction of magnetic north.", "translations": { "cn": "指南针", "ms": "kompas" }, "sentences": { "en": "The hiker checked his compass several times.", "cn": "徒步旅行者检查了好几次指南针。", "ms": "Pendaki itu menyemak kompasnya beberapa kali." } },
            { "word": "summit", "hint": "The highest point of a hill or mountain.", "translations": { "cn": "峰会/顶点", "ms": "kemuncak/puncak" }, "sentences": { "en": "The group took a photo at the mountain summit.", "cn": "小组在山顶拍了张照片。", "ms": "Kumpulan itu mengambil gambar di kemuncak gunung." } }
        ],
        "Unit 4: Cool jobs": [
            { "word": "journalist", "hint": "A person who writes for newspapers, magazines, or news websites.", "translations": { "cn": "记者", "ms": "wartawan" }, "sentences": { "en": "The journalist interviewed the Prime Minister.", "cn": "记者采访了首相。", "ms": "Wartawan itu menemu ramah Perdana Menteri." } },
            { "word": "architect", "hint": "A person who designs buildings and in many cases also supervises their construction.", "translations": { "cn": "建筑师", "ms": "arkitek" }, "sentences": { "en": "The architect designed a stunning new museum.", "cn": "建筑师设计了一座令人惊叹的新博物馆。", "ms": "Arkitek itu merancang muzium baharu yang menakjubkan." } },
            { "word": "mechanic", "hint": "A person who repairs and maintains machinery and motors.", "translations": { "cn": "技工/机械师", "ms": "mekanik" }, "sentences": { "en": "The mechanic repaired the broken engine.", "cn": "技工修理了损坏的发动机。", "ms": "Mekanik itu membaiki enjin yang rosak." } },
            { "word": "engineer", "hint": "A person who designs, builds, or maintains engines, machines, or public works.", "translations": { "cn": "工程师", "ms": "jurutera" }, "sentences": { "en": "The civil engineer planned the new bridge.", "cn": "土木工程师规划了新桥。", "ms": "Jurutera awam itu merancang jambatan baharu." } },
            { "word": "programmer", "hint": "A person who writes computer software.", "translations": { "cn": "程序员", "ms": "pengatur cara" }, "sentences": { "en": "A skilled programmer can write complex code.", "cn": "一位熟练的程序员可以编写复杂的代码。", "ms": "Seorang pengatur cara yang mahir boleh menulis kod yang kompleks." } },
            { "word": "designer", "hint": "A person who plans the look or workings of something prior to it being made.", "translations": { "cn": "设计师", "ms": "pereka" }, "sentences": { "en": "The fashion designer created a beautiful dress.", "cn": "时装设计师设计了一件漂亮的裙子。", "ms": "Pereka fesyen itu mencipta sehelai pakaian yang cantik." } },
            { "word": "scientist", "hint": "A person who is studying or has expert knowledge of one or more of the natural or physical sciences.", "translations": { "cn": "科学家", "ms": "saintis/ahli sains" }, "sentences": { "en": "The scientist conducted experiments in the lab.", "cn": "科学家在实验室里进行实验。", "ms": "Ahli sains itu menjalankan eksperimen di dalam makmal." } },
            { "word": "detective", "hint": "A person, especially a police officer, whose occupation is to investigate and solve crimes.", "translations": { "cn": "侦探", "ms": "detektif/penyiasat" }, "sentences": { "en": "The private detective found the missing person.", "cn": "私家侦探找到了失踪的人。", "ms": "Detektif persendirian itu menemui orang yang hilang." } },
            { "word": "pilot", "hint": "A person who operates the flying controls of an aircraft.", "translations": { "cn": "飞行员", "ms": "juruterbang" }, "sentences": { "en": "The pilot flew the plane through the storm.", "cn": "飞行员驾驶飞机穿过了风暴。", "ms": "Juruterbang itu menerbangkan pesawat merentasi ribut." } },
            { "word": "surgeon", "hint": "A medical practitioner qualified to practice surgery.", "translations": { "cn": "外科医生", "ms": "pakar bedah" }, "sentences": { "en": "The surgeon performed a successful operation.", "cn": "外科医生成功地进行了一次手术。", "ms": "Pakar bedah itu melakukan pembedahan yang berjaya." } }
        ],
        "Unit 5: Getting around": [
            { "word": "transport", "hint": "Take or carry people or goods from one place to another.", "translations": { "cn": "运输/交通", "ms": "pengangkutan" }, "sentences": { "en": "Public transport is efficient in the city.", "cn": "城市的公共交通很高效。", "ms": "Pengangkutan awam adalah cekap di bandar ini." } },
            { "word": "helicopter", "hint": "A type of aircraft which derives both lift and propulsion from one or more sets of horizontally revolving overhead rotors.", "translations": { "cn": "直升机", "ms": "helikopter" }, "sentences": { "en": "The rescue helicopter landed in the field.", "cn": "救援直升机降落在田野里。", "ms": "Helikopter penyelamat mendarat di padang." } },
            { "word": "motorcycle", "hint": "A two-wheeled vehicle that is powered by a motor and has no pedals.", "translations": { "cn": "摩托车", "ms": "motosikal" }, "sentences": { "en": "Always wear a helmet when riding a motorcycle.", "cn": "骑摩托车时一定要戴头盔。", "ms": "Sentiasa pakai topi keledar semasa menunggang motosikal." } },
            { "word": "subway", "hint": "An underground railway.", "translations": { "cn": "地铁", "ms": "kereta api bawah tanah/subway" }, "sentences": { "en": "The subway is the fastest way to travel through London.", "cn": "地铁是穿行伦敦最快的方式。", "ms": "Kereta api bawah tanah ialah cara paling laju untuk mengembara merentasi London." } },
            { "word": "ferry", "hint": "A boat or ship for conveying passengers and goods, especially over a relatively short distance and as a regular service.", "translations": { "cn": "渡轮", "ms": "feri" }, "sentences": { "en": "We took the ferry across the harbor.", "cn": "我们乘渡轮穿过海港。", "ms": "Kami menaiki feri merentasi pelabuhan." } },
            { "word": "scooter", "hint": "A light two-wheeled open motor vehicle with a floorboard on which the rider's feet rest.", "translations": { "cn": "小轮摩托车/滑板车", "ms": "skuter" }, "sentences": { "en": "The delivery boy uses a small scooter.", "cn": "送货员使用一辆小摩托车。", "ms": "Budak penghantar itu menggunakan sebuah skuter kecil." } },
            { "word": "commuter", "hint": "A person who travels some distance to work on a regular basis.", "translations": { "cn": "通勤者", "ms": "ulang-alik/komuter" }, "sentences": { "en": "Many commuters use the early morning train.", "cn": "许多通勤者乘坐清晨的火车。", "ms": "Ramai orang yang berulang-alik bekerja menggunakan kereta api awal pagi." } },
            { "word": "traffic", "hint": "Vehicles moving on a public highway.", "translations": { "cn": "交通", "ms": "lalu lintas" }, "sentences": { "en": "The heavy traffic made us late for the meeting.", "cn": "拥挤的交通让我们开会迟到了。", "ms": "Lalu lintas yang sesak menyebabkan kami lewat ke mesyuarat." } },
            { "word": "vehicle", "hint": "A thing used for transporting people or goods, especially on land.", "translations": { "cn": "车辆", "ms": "kenderaan" }, "sentences": { "en": "Remember to lock your vehicle properly.", "cn": "记得锁好你的车。", "ms": "Ingat untuk mengunci kenderaan anda dengan betul." } },
            { "word": "destination", "hint": "The place to which someone or something is going or being sent.", "translations": { "cn": "目的地", "ms": "destinasi" }, "sentences": { "en": "We finally reached our holiday destination.", "cn": "我们终于到达了度假目的地。", "ms": "Kami akhirnya sampai ke destinasi percutian kami." } }
        ],
        "Unit 6: How is it made?": [
            { "word": "material", "hint": "The matter from which a thing is or can be made.", "translations": { "cn": "材料/物质", "ms": "bahan" }, "sentences": { "en": "Cotton is a natural material for clothing.", "cn": "棉花是一种天然的服装材料。", "ms": "Kapas ialah bahan semula jadi untuk pakaian." } },
            { "word": "product", "hint": "An article or substance that is manufactured or refined for sale.", "translations": { "cn": "产品", "ms": "produk" }, "sentences": { "en": "The final product was tested for quality.", "cn": "最终产品通过了质量检测。", "ms": "Produk akhir telah diuji kualitinya." } },
            { "word": "factory", "hint": "A large building or group of buildings where goods are manufactured.", "translations": { "cn": "工厂", "ms": "kilang" }, "sentences": { "en": "The toy factory produces thousands of dolls.", "cn": "玩具厂生产成千上万个玩偶。", "ms": "Kilang mainan itu mengeluarkan beribu-ribu anak patung." } },
            { "word": "machine", "hint": "An apparatus using or applying mechanical power and having several parts.", "translations": { "cn": "机器", "ms": "mesin" }, "sentences": { "en": "The washing machine is broken.", "cn": "洗衣机坏了。", "ms": "Mesin basuh itu telah rosak." } },
            { "word": "recycle", "hint": "Convert (waste) into reusable material.", "translations": { "cn": "回收", "ms": "kitar semula" }, "sentences": { "en": "Recycle glass bottles to save resources.", "cn": "回收玻璃瓶以节省资源。", "ms": "Kitar semula botol kaca untuk menjimatkan sumber." } },
            { "word": "manufacture", "hint": "The making of articles on a large scale using machinery.", "translations": { "cn": "制造", "ms": "mengilangkan/pembuatan" }, "sentences": { "en": "They manufacture high-quality furniture.", "cn": "他们制造高质量的家具。", "ms": "Mereka mengeluarkan perabot yang berkualiti tinggi." } },
            { "word": "ingredient", "hint": "Any of the foods or substances that are combined to make a particular dish.", "translations": { "cn": "原料/成分", "ms": "bahan ramuan" }, "sentences": { "en": "Fresh herbs are an important ingredient.", "cn": "新鲜草药是一个重要的成分。", "ms": "Herba segar ialah bahan ramuan yang penting." } },
            { "word": "export", "hint": "Send (goods or services) to another country for sale.", "translations": { "cn": "出口", "ms": "eksport" }, "sentences": { "en": "Malaysia exports palm oil to many countries.", "cn": "马来西亚向许多国家出口棕榈油。", "ms": "Malaysia mengeksport minyak sawit ke banyak negara." } },
            { "word": "import", "hint": "Bring (goods or services) into a country from abroad for sale.", "translations": { "cn": "进口", "ms": "import" }, "sentences": { "en": "The country imports expensive electronics.", "cn": "该国进口昂贵的电子产品。", "ms": "Negara itu mengimport barangan elektronik yang mahal." } },
            { "word": "quality", "hint": "The standard of something as measured against other things of a similar kind.", "translations": { "cn": "质量/品质", "ms": "kualiti/mutu" }, "sentences": { "en": "We always aim for high quality products.", "cn": "我们的目标始终是高质量的产品。", "ms": "Kami sentiasa menyasarkan produk yang berkualiti tinggi." } }
        ],
        "Unit 7: Music superstars": [
            { "word": "audience", "hint": "The assembled spectators or listeners at a public event.", "translations": { "cn": "观众/听众", "ms": "penonton/hadirin" }, "sentences": { "en": "The audience cheered loudly after the song.", "cn": "歌曲结束后，观众大声喝彩。", "ms": "Penonton bersorak dengan kuat selepas lagu itu tamat." } },
            { "word": "concert", "hint": "A musical performance given in public.", "translations": { "cn": "音乐会/演唱会", "ms": "konsert" }, "sentences": { "en": "We bought tickets for the pop concert.", "cn": "我们买了流行音乐演唱会的票。", "ms": "Kami membeli tiket untuk konsert pop itu." } },
            { "word": "instrument", "hint": "An object or device for producing musical sounds.", "translations": { "cn": "乐器", "ms": "alat muzik" }, "sentences": { "en": "The piano is a beautiful musical instrument.", "cn": "钢琴是一种美丽的乐器。", "ms": "Piano ialah alat muzik yang indah." } },
            { "word": "musician", "hint": "A person who plays a musical instrument or is musically talented.", "translations": { "cn": "音乐家", "ms": "pemuzik" }, "sentences": { "en": "A professional musician practiced for hours.", "cn": "一位专业音乐家练习了几个小时。", "ms": "Seorang pemuzik profesional berlatih selama berjam-jam." } },
            { "word": "rhythm", "hint": "A strong, regular, repeated pattern of movement or sound.", "translations": { "cn": "节奏/韵律", "ms": "ritma" }, "sentences": { "en": "Clap your hands to the rhythm of the music.", "cn": "跟着音乐的节奏拍手。", "ms": "Tepuk tangan anda mengikut ritma muzik itu." } },
            { "word": "melody", "hint": "A sequence of single notes that is musically satisfying.", "translations": { "cn": "旋律/曲调", "ms": "melodi" }, "sentences": { "en": "The haunting melody stayed in my head.", "cn": "那段挥之不去的旋律一直留在我脑海里。", "ms": "Melodi yang menusuk kalbu itu terngiang-ngiang di fikiran saya." } },
            { "word": "performance", "hint": "An act of staging or presenting a play, concert, or other form of entertainment.", "translations": { "cn": "表演/演出", "ms": "persembahan" }, "sentences": { "en": "The live performance was absolutely amazing.", "cn": "现场表演绝对精彩。", "ms": "Persembahan secara langsung itu sangat menakjubkan." } },
            { "word": "star", "hint": "A famous entertainer or sports player.", "translations": { "cn": "明星", "ms": "bintang" }, "sentences": { "en": "The movie star signed many autographs.", "cn": "那位影星签了许多名。", "ms": "Bintang filem itu menandatangani banyak autograf." } },
            { "word": "tour", "hint": "A journey made by a performer or team to several different places.", "translations": { "cn": "巡回演出/旅行", "ms": "jelajah/lawatan" }, "sentences": { "en": "The band is planning a world tour.", "cn": "乐队正计划环球旅行演出。", "ms": "Kumpulan dikir itu sedang merancang jelajah dunia." } },
            { "word": "stage", "hint": "A raised floor or platform on which actors, entertainers, or speakers perform.", "translations": { "cn": "舞台", "ms": "pentas" }, "sentences": { "en": "The actors took their bows on the stage.", "cn": "演员们在舞台上鞠躬致意。", "ms": "Para pelakon itu tunduk hormat di atas pentas." } }
        ],
        "Unit 8: Tell me a story": [
            { "word": "atmosphere", "hint": "The pervading tone or mood of a place, situation, or creative work.", "translations": { "cn": "氛围/气氛", "ms": "suasana" }, "sentences": { "en": "The spooky house had a dark atmosphere.", "cn": "那栋幽灵屋有一种阴森的气氛。", "ms": "Rumah berhantu itu mempunyai suasana yang menyeramkan." } },
            { "word": "character", "hint": "A person in a novel, play, or movie.", "translations": { "cn": "角色/人物", "ms": "watak" }, "sentences": { "en": "The main character in the story is very brave.", "cn": "故事里的主角非常勇敢。", "ms": "Watak utama dalam cerita itu sangat berani." } },
            { "word": "climax", "hint": "The most intense, exciting, or important point of something.", "translations": { "cn": "高潮", "ms": "kemuncak" }, "sentences": { "en": "The movie reached its climax during the final battle.", "cn": "电影在最后的战斗中达到了高潮。", "ms": "Filem itu mencapai kemuncaknya semasa pertempuran terakhir." } },
            { "word": "conflict", "hint": "A serious disagreement or argument.", "translations": { "cn": "冲突/矛盾", "ms": "konflik" }, "sentences": { "en": "The story's conflict was between the two brothers.", "cn": "故事的冲突发生在两兄弟之间。", "ms": "Konflik cerita itu adalah antara dua beradik." } },
            { "word": "narrator", "hint": "A person who delivers a commentary accompanying a movie or broadcast.", "translations": { "cn": "讲述者/解说员", "ms": "pencerita/naratif" }, "sentences": { "en": "The narrator has a deep and calming voice.", "cn": "讲述者的声音深沉而平静。", "ms": "Pencerita itu mempunyai suara yang garau and tenang." } },
            { "word": "plot", "hint": "The main events of a play, movie, or similar work, devised and presented by the writer as a interrelated sequence.", "translations": { "cn": "情节", "ms": "plot/jalan cerita" }, "sentences": { "en": "The book has a very complicated plot.", "cn": "这本书的情节非常复杂。", "ms": "Buku itu mempunyai plot yang sangat rumit." } },
            { "word": "setting", "hint": "The place or type of surroundings where something is positioned or where an event takes place.", "translations": { "cn": "背景/环境", "ms": "latar/latar tempat" }, "sentences": { "en": "The story's setting is a futuristic city.", "cn": "故事的背景是一个未来城市。", "ms": "Latar cerita itu ialah sebuah bandar futuristik." } },
            { "word": "suspense", "hint": "A state or feeling of excited or anxious uncertainty about what may happen.", "translations": { "cn": "悬念/焦虑", "ms": "saspens" }, "sentences": { "en": "The mystery novel was full of suspense.", "cn": "这部推理小说充满了悬念。", "ms": "Novel misteri itu penuh dengan saspens." } },
            { "word": "theme", "hint": "The subject of a talk, a piece of writing, a person's thoughts, or an exhibition; a topic.", "translations": { "cn": "主题", "ms": "tema" }, "sentences": { "en": "The main theme of the story is friendship.", "cn": "故事的主题是友谊。", "ms": "Tema utama cerita itu ialah persahabatan." } },
            { "word": "villain", "hint": "A character whose evil actions or motives are important to the plot.", "translations": { "cn": "反派/恶棍", "ms": "penjahat" }, "sentences": { "en": "The villain tried to take over the world.", "cn": "反派企图接管世界。", "ms": "Penjahat itu cuba untuk menguasai dunia." } }
        ],
        "Unit 9: What's your opinion?": [
            { "word": "agree", "hint": "Have the same opinion about something; concur.", "translations": { "cn": "同意", "ms": "setuju/bersetuju" }, "sentences": { "en": "I agree with your suggestion.", "cn": "我同意你的建议。", "ms": "Saya bersetuju dengan cadangan anda." } },
            { "word": "argument", "hint": "A reason or set of reasons given with the aim of persuading others that an action or idea is right or wrong.", "translations": { "cn": "论点/争论", "ms": "hujah/pertengkaran" }, "sentences": { "en": "He presented a strong argument for the new rule.", "cn": "他为新规定提出了强有力的论点。", "ms": "Dia mengemukakan hujah yang kuat untuk peraturan baharu itu." } },
            { "word": "believe", "hint": "Accept (something) as true; feel sure of the truth of.", "translations": { "cn": "相信/认为", "ms": "percaya/yakin" }, "sentences": { "en": "I believe that kindness is important.", "cn": "我相信善良很重要。", "ms": "Saya percaya bahawa sifat baik hati adalah penting." } },
            { "word": "debate", "hint": "A formal discussion on a particular topic in a public meeting or legislative assembly, in which opposing arguments are put forward.", "translations": { "cn": "辩论", "ms": "debat/perbahasan" }, "sentences": { "en": "The students had a lively debate about the environment.", "cn": "学生们就环境问题进行了一场生动的辩论。", "ms": "Pelajar-pelajar itu mengadakan perbahasan yang rancak tentang alam sekitar." } },
            { "word": "disagree", "hint": "Have or express a different opinion.", "translations": { "cn": "不同意", "ms": "tidak setuju" }, "sentences": { "en": "It is okay to disagree politely.", "cn": "有礼貌地表示不同意是可以的。", "ms": "Tidak mengapa untuk tidak bersetuju secara sopan." } },
            { "word": "evidence", "hint": "The available body of facts or information indicating whether a belief or proposition is true or valid.", "translations": { "cn": "证据", "ms": "bukti" }, "sentences": { "en": "The police are looking for more evidence.", "cn": "警方正在寻找更多证据。", "ms": "Polis sedang mencari lebih banyak bukti." } },
            { "word": "opinion", "hint": "A view or judgment formed about something, not necessarily based on fact or knowledge.", "translations": { "cn": "意见/观点", "ms": "pendapat" }, "sentences": { "en": "In my opinion, this book is very interesting.", "cn": "在我看来，这本书很有趣。", "ms": "Pada pendapat saya, buku ini sangat menarik." } },
            { "word": "persuade", "hint": "Provide a sound reason for (someone) to do something.", "translations": { "cn": "说服", "ms": "pujuk/meyakinkan" }, "sentences": { "en": "I tried to persuade him to join our team.", "cn": "我试图说服他加入我们的团队。", "ms": "Saya cuba memujuknya untuk menyertai pasukan kami." } },
            { "word": "reason", "hint": "A cause, explanation, or justification for an action or event.", "translations": { "cn": "原因/理由", "ms": "sebab/alasan" }, "sentences": { "en": "Tell me the reason why you were late.", "cn": "告诉我你迟到的原因。", "ms": "Beritahu saya sebab mengapa anda lewat." } },
            { "word": "support", "hint": "Give assistance to, especially financially; enable to function or act.", "translations": { "cn": "支持", "ms": "sokongan/menyokong" }, "sentences": { "en": "My friends always support my decisions.", "cn": "我的朋友总是支持我的决定。", "ms": "Kawan-kawan saya sentiasa menyokong keputusan saya." } }
        ],
        "Unit 10: It's a mystery!": [
            { "word": "clue", "hint": "A piece of evidence or information used in the detection of a crime or solving of a mystery.", "translations": { "cn": "线索", "ms": "petunjuk" }, "sentences": { "en": "The detective found a vital clue at the scene.", "cn": "侦探在现场发现了一个至关重要的线索。", "ms": "Penyiasat menemui petunjuk penting di tempat kejadian." } },
            { "word": "confess", "hint": "Admit that one has committed a crime or done something wrong.", "translations": { "cn": "坦白/供认", "ms": "mengaku/pengakuan" }, "sentences": { "en": "The thief decided to confess his crimes.", "cn": "小偷决定供认他的罪行。", "ms": "Pencuri itu memutuskan untuk mengaku akan jenayahnya." } },
            { "word": "deduction", "hint": "The inference of particular instances by reference to a general law or principle.", "translations": { "cn": "推断/扣除", "ms": "inferens/deduksi" }, "sentences": { "en": "Sherlock Holmes is famous for his logical deduction.", "cn": "夏洛克·福尔摩斯以其逻辑推断而闻名。", "ms": "Sherlock Holmes terkenal dengan deduksi logiknya." } },
            { "word": "investigate", "hint": "Carry out a systematic or formal inquiry to discover and examine the facts of (an incident, allegation, etc.) so as to establish the truth.", "translations": { "cn": "调查", "ms": "siasat/menyiasat" }, "sentences": { "en": "The police will investigate the break-in.", "cn": "警方将调查这起闯入案。", "ms": "Polis akan menyiasat kejadian pecah masuk itu." } },
            { "word": "mystery", "hint": "Something that is difficult or impossible to understand or explain.", "translations": { "cn": "谜/神秘", "ms": "misteri" }, "sentences": { "en": "The missing keys are still a mystery.", "cn": "丢失的钥匙仍然是一个谜。", "ms": "Kunci yang hilang itu masih menjadi misteri." } },
            { "word": "proof", "hint": "Evidence or argument establishing or helping to establish a fact or the truth of a statement.", "translations": { "cn": "证明/证据", "ms": "bukti/pembuktian" }, "sentences": { "en": "Do you have any proof of your claim?", "cn": "你有任何证明你主张的证据吗？", "ms": "Adakah anda mempunyai bukti untuk dakwaan anda?" } },
            { "word": "solve", "hint": "Find an answer to, explanation for, or means of effectively dealing with (a problem or mystery).", "translations": { "cn": "解决/解答", "ms": "selesai/menyelesaikan" }, "sentences": { "en": "It took hours to solve the difficult puzzle.", "cn": "花了几个小时才解开这个难题。", "ms": "Ia mengambil masa berjam-jam untuk menyelesaikan teka-teki yang sukar itu." } },
            { "word": "suspect", "hint": "A person thought to be guilty of a crime or offense.", "translations": { "cn": "嫌疑人", "ms": "suspek" }, "sentences": { "en": "The police have arrested a prime suspect.", "cn": "警方已经逮捕了一名主要嫌疑人。", "ms": "Polis telah menangkap seorang suspek utama." } },
            { "word": "witness", "hint": "A person who sees an event, typically a crime or accident, take place.", "translations": { "cn": "目击者/证人", "ms": "saksi" }, "sentences": { "en": "The witness described the suspect for the police.", "cn": "目击者向警方描述了嫌疑人的样子。", "ms": "Saksi itu menghuraikan suspek kepada pihak polis." } },
            { "word": "shadow", "hint": "A dark area or shape produced by a body coming between rays of light and a surface.", "translations": { "cn": "影子", "ms": "bayang-bayang" }, "sentences": { "en": "I saw a shadow move on the wall.", "cn": "我看到墙上一个影子在移动。", "ms": "Saya nampak bayang-bayang bergerak di atas dinding." } }
        ]
    },
    "Custom": {
        "Space Adventure": [
            { "word": "sun", "hint": "The star at the center of our solar system.", "difficulty": "easy", "translations": { "cn": "太阳", "ms": "matahari" }, "sentences": { "en": "The sun is very hot and bright.", "cn": "太阳又热又亮。", "ms": "Matahari sangat panas dan cerah." } },
            { "word": "moon", "hint": "The natural satellite of the Earth.", "difficulty": "easy", "translations": { "cn": "月亮", "ms": "bulan" }, "sentences": { "en": "The moon shines at night.", "cn": "月亮在夜晚闪耀。", "ms": "Bulan bersinar di malam hari." } },
            { "word": "star", "hint": "A luminous point in the night sky.", "difficulty": "easy", "translations": { "cn": "星星", "ms": "bintang" }, "sentences": { "en": "I can see many stars in the sky.", "cn": "我可以在天空看到许多星星。", "ms": "Saya boleh nampak banyak bintang di langit." } },
            { "word": "mars", "hint": "The Red Planet.", "difficulty": "easy", "translations": { "cn": "火星", "ms": "Marikh" }, "sentences": { "en": "Mars is known as the red planet.", "cn": "火星被称为红色星球。", "ms": "Marikh dikenali sebagai planet merah." } },
            { "word": "earth", "hint": "Our home planet.", "difficulty": "easy", "translations": { "cn": "地球", "ms": "bumi" }, "sentences": { "en": "We live on the planet Earth.", "cn": "我们住在地球上。", "ms": "Kita tinggal di planet bumi." } },
            { "word": "rocket", "hint": "A vehicle used for space travel.", "difficulty": "easy", "translations": { "cn": "火箭", "ms": "roket" }, "sentences": { "en": "The rocket flew into space.", "cn": "火箭飞向了太空。", "ms": "Roket itu terbang ke angkasa." } },
            { "word": "alien", "hint": "A creature from another planet.", "difficulty": "easy", "translations": { "cn": "外星人", "ms": "makhluk asing" }, "sentences": { "en": "The alien has three green eyes.", "cn": "外星人有三只绿色的眼睛。", "ms": "Makhluk asing itu ada tiga mata hijau." } },
            { "word": "space", "hint": "The vast empty area beyond Earth.", "difficulty": "easy", "translations": { "cn": "太空", "ms": "angkasa" }, "sentences": { "en": "Astronauts travel into space.", "cn": "宇航员前往太空旅行。", "ms": "Angkasawan mengembara ke angkasa." } },
            { "word": "sky", "hint": "The region above the Earth.", "difficulty": "easy", "translations": { "cn": "天空", "ms": "langit" }, "sentences": { "en": "The sky is blue today.", "cn": "今天天空很蓝。", "ms": "Langit berwarna biru hari ini." } },
            { "word": "dark", "hint": "Lack of light in space.", "difficulty": "easy", "translations": { "cn": "黑暗", "ms": "gelap" }, "sentences": { "en": "Outer space is very dark.", "cn": "外层空间非常黑暗。", "ms": "Angkasa lepas sangat gelap." } },
            { "word": "planet", "hint": "A large body orbiting a star.", "difficulty": "medium", "translations": { "cn": "行星", "ms": "planet" }, "sentences": { "en": "Saturn is a beautiful planet with rings.", "cn": "土星是一个有环的美丽行星。", "ms": "Utarid ialah sebuah planet yang cantik dengan gelung." } },
            { "word": "gravity", "hint": "The force that pulls objects down.", "difficulty": "medium", "translations": { "cn": "重力", "ms": "graviti" }, "sentences": { "en": "Gravity keeps us on the ground.", "cn": "重力让我们保持在地面上。", "ms": "Graviti mengekalkan kita di atas tanah." } },
            { "word": "galaxy", "hint": "A huge system of stars.", "difficulty": "medium", "translations": { "cn": "星系", "ms": "galaksi" }, "sentences": { "en": "We live in the Milky Way galaxy.", "cn": "我们生活在银河系中。", "ms": "Kita tinggal di galaksi Bima Sakti." } },
            { "word": "orbit", "hint": "To travel around a planet or star.", "difficulty": "medium", "translations": { "cn": "轨道", "ms": "orbit" }, "sentences": { "en": "The Earth is in orbit around the Sun.", "cn": "地球绕着太阳轨道运行。", "ms": "Bumi berada dalam orbit mengelilingi Matahari." } },
            { "word": "comet", "hint": "A ball of ice and dust with a tail.", "difficulty": "medium", "translations": { "cn": "彗星", "ms": "tahi bintang" }, "sentences": { "en": "The comet has a long bright tail.", "cn": "彗星有一条长长的亮尾巴。", "ms": "Tahi bintang itu mempunyai ekor yang panjang dan cerah." } },
            { "word": "meteor", "hint": "A rock that burns up in the atmosphere.", "difficulty": "medium", "translations": { "cn": "流星", "ms": "meteor" }, "sentences": { "en": "A meteor streak across the night sky.", "cn": "一颗流星划过夜空。", "ms": "Satu meteor melintas di langit malam." } },
            { "word": "saturn", "hint": "A planet famous for its rings.", "difficulty": "medium", "translations": { "cn": "土星", "ms": "Zuhal" }, "sentences": { "en": "Saturn has many magnificent rings.", "cn": "土星有许多壮丽的环。", "ms": "Planet Zuhal mempunyai banyak gelung yang indah." } },
            { "word": "jupiter", "hint": "The largest planet in our solar system.", "difficulty": "medium", "translations": { "cn": "木星", "ms": "Musytari" }, "sentences": { "en": "Jupiter is a giant gas planet.", "cn": "木星是一个巨大的气体行星。", "ms": "Musytari ialah planet gas gergasi." } },
            { "word": "vacuum", "hint": "Space that is completely empty of matter.", "difficulty": "medium", "translations": { "cn": "真空", "ms": "vakum" }, "sentences": { "en": "There is a vacuum in outer space.", "cn": "外层空间是真空的。", "ms": "Terdapat vakum di angkasa lepas." } },
            { "word": "shuttle", "hint": "A reusable spacecraft.", "difficulty": "medium", "translations": { "cn": "航天飞机", "ms": "ulang-alik" }, "sentences": { "en": "The space shuttle landed safely.", "cn": "航天飞机安全降落。", "ms": "Pesawat ulang-alik mendarat dengan selamat." } },
            { "word": "asteroid", "hint": "A small rocky body orbiting the sun.", "difficulty": "hard", "translations": { "cn": "小行星", "ms": "asteroid" }, "sentences": { "en": "An asteroid hit the moon's surface.", "cn": "一颗小行星撞击了月球表面。", "ms": "Sebuah asteroid melanggar permukaan bulan." } },
            { "word": "nebula", "hint": "A cloud of gas and dust in space.", "difficulty": "hard", "translations": { "cn": "星云", "ms": "nebula" }, "sentences": { "en": "The nebula is a birthplace for stars.", "cn": "星云是恒星的诞生地。", "ms": "Nebula ialah tempat kelahiran bintang." } },
            { "word": "eclipse", "hint": "When one celestial body blocks another.", "difficulty": "hard", "translations": { "cn": "日食/月食", "ms": "fana" }, "sentences": { "en": "We watched the solar eclipse through filters.", "cn": "我们通过滤镜观察了日食。", "ms": "Kami melihat gerhana matahari melalui penapis." } },
            { "word": "pulsar", "hint": "A highly magnetized rotating neutron star.", "difficulty": "hard", "translations": { "cn": "脉冲星", "ms": "pulsar" }, "sentences": { "en": "A pulsar emits beams of radiation.", "cn": "脉冲星发射辐射束。", "ms": "Pulsar memancarkan alur radiasi." } },
            { "word": "quasar", "hint": "A very bright and distant celestial object.", "difficulty": "hard", "translations": { "cn": "类星体", "ms": "kuasar" }, "sentences": { "en": "A quasar is one of the brightest objects.", "cn": "类星体是最亮的天体之一。", "ms": "Kuasar adalah salah satu objek yang paling terang." } },
            { "word": "cosmos", "hint": "The universe seen as a well-ordered whole.", "difficulty": "hard", "translations": { "cn": "宇宙", "ms": "kosmos" }, "sentences": { "en": "The cosmos is vast and mysterious.", "cn": "宇宙广阔而神秘。", "ms": "Kosmos adalah sangat luas dan misteri." } },
            { "word": "zenith", "hint": "The point directly above an observer.", "difficulty": "hard", "translations": { "cn": "天顶", "ms": "zenit" }, "sentences": { "en": "The sun reached its zenith at noon.", "cn": "太阳在中午达到了天顶。", "ms": "Matahari mencapai kemuncaknya pada waktu tengah hari." } },
            { "word": "photon", "hint": "A particle representing a quantum of light.", "difficulty": "hard", "translations": { "cn": "光子", "ms": "foton" }, "sentences": { "en": "A photon is a basic unit of light.", "cn": "光子是光的基本单位。", "ms": "Foton ialah unit asas cahaya." } },
            { "word": "module", "hint": "A self-contained part of a spacecraft.", "difficulty": "hard", "translations": { "cn": "舱模块", "ms": "modul" }, "sentences": { "en": "The lunar module landed on the moon.", "cn": "登月舱降落在月球上。", "ms": "Modul bulan mendarat di atas bulan." } },
            { "word": "capsule", "hint": "The part of a spacecraft where people live.", "difficulty": "hard", "translations": { "cn": "太空舱", "ms": "kapsul" }, "sentences": { "en": "The astronauts returned in a small capsule.", "cn": "宇航员乘坐一个小舱返回。", "ms": "Angkasawan pulang dalam kapsul kecil." } },
            { "word": "supernova", "hint": "A powerful and luminous stellar explosion.", "difficulty": "expert", "translations": { "cn": "超新星", "ms": "supernova" }, "sentences": { "en": "A supernova is a massive star explosion.", "cn": "超新星是一颗巨大的恒星爆炸。", "ms": "Supernova ialah satu letupan bintang yang besar." } },
            { "word": "blackhole", "hint": "A region of spacetime with strong gravity.", "difficulty": "expert", "translations": { "cn": "黑洞", "ms": "lubang hitam" }, "sentences": { "en": "Nothing can escape from a black hole.", "cn": "没有任何东西可以逃离黑洞。", "ms": "Tiada apa-apa yang boleh lari dari lubang hitam." } },
            { "word": "exoplanet", "hint": "A planet outside our solar system.", "difficulty": "expert", "translations": { "cn": "系外行星", "ms": "eksoplanet" }, "sentences": { "en": "Scientists study exoplanets for signs of life.", "cn": "科学家研究系外行星寻找生命迹象。", "ms": "Saintis mengkaji eksoplanet untuk tanda-tanda kehidupan." } },
            { "word": "singularity", "hint": "A point where gravity becomes infinite.", "difficulty": "expert", "translations": { "cn": "奇点", "ms": "singulariti" }, "sentences": { "en": "A singularity is at the center of a black hole.", "cn": "奇点位于黑洞的中心。", "ms": "Singulariti berada di pusat lubang hitam." } },
            { "word": "telescope", "hint": "An instrument for seeing distant objects.", "difficulty": "expert", "translations": { "cn": "望远镜", "ms": "teleskop" }, "sentences": { "en": "I use a telescope to see the planets.", "cn": "我用望远镜观察行星。", "ms": "Saya menggunakan teleskop untuk melihat planet." } },
            { "word": "astronaut", "hint": "A person trained for space travel.", "difficulty": "expert", "translations": { "cn": "宇航员", "ms": "angkasawan" }, "sentences": { "en": "The astronaut walked on the moon.", "cn": "宇航员在月球上行走。", "ms": "Angkasawan itu berjalan di atas bulan." } },
            { "word": "longitude", "hint": "Distance east or west of the prime meridian.", "difficulty": "expert", "translations": { "cn": "经度", "ms": "longitud" }, "sentences": { "en": "The ship's longitude was carefully measured.", "cn": "船的经度经过仔细测量。", "ms": "Longitud kapal diukur dengan teliti." } },
            { "word": "spectroscopy", "hint": "Study of light from stars.", "difficulty": "expert", "translations": { "cn": "光谱学", "ms": "spektroskopi" }, "sentences": { "en": "Spectroscopy helps us find star temperatures.", "cn": "光谱学帮助我们确定恒星温度。", "ms": "Spektroskopi membantu kita mencari suhu bintang." } },
            { "word": "atmosphere", "hint": "The envelope of gases surrounding a planet.", "difficulty": "expert", "translations": { "cn": "大气层", "ms": "atmosfera" }, "sentences": { "en": "The Earth has a thick atmosphere.", "cn": "地球有厚厚的大气层。", "ms": "Bumi mempunyai atmosfera yang tebal." } },
            { "word": "constellation", "hint": "A group of stars forming a pattern.", "difficulty": "expert", "translations": { "cn": "星座", "ms": "buruj" }, "sentences": { "en": "Orion is a well-known constellation.", "cn": "猎户座是一个著名的星座。", "ms": "Orion ialah buruj yang terkenal." } },
            { "word": "parallax", "hint": "The apparent displacement of an object.", "difficulty": "expert", "translations": { "cn": "视差", "ms": "paralaks" }, "sentences": { "en": "视差被用来测量恒星距离。", "cn": "视差被用来测量恒星距离。", "ms": "Paralaks digunakan untuk mengukur jarak bintang." } },
            { "word": "equinox", "hint": "Time when day and night are of equal length.", "difficulty": "expert", "translations": { "cn": "昼夜平分点", "ms": "ekuinoks" }, "sentences": { "en": "The spring equinox is in March.", "cn": "春分是在三月。", "ms": "Ekuinoks musim bunga adalah pada bulan Mac." } },
            { "word": "solstice", "hint": "When the sun reaches its highest or lowest point.", "difficulty": "expert", "translations": { "cn": "至点", "ms": "solstis" }, "sentences": { "en": "The summer solstice is the longest day.", "cn": "夏至是一年中最长的一天。", "ms": "Solstis musim panas ialah hari yang paling panjang." } },
            { "word": "lightyear", "hint": "The distance light travels in one year.", "difficulty": "expert", "translations": { "cn": "光年", "ms": "tahun cahaya" }, "sentences": { "en": "The nearest star is four light years away.", "cn": "最近的恒星在四光年外。", "ms": "Bintang terdekat berada sejauh empat tahun cahaya." } },
            { "word": "cosmology", "hint": "The study of the origin of the universe.", "difficulty": "expert", "translations": { "cn": "宇宙学", "ms": "kosmologi" }, "sentences": { "en": "Cosmology explains how the universe began.", "cn": "宇宙学解释了宇宙是如何开始的。", "ms": "Kosmologi menerangkan bagaimana alam semesta bermula." } },
            { "word": "telemetry", "hint": "Collection of data at a distance.", "difficulty": "expert", "translations": { "cn": "遥测", "ms": "telemetri" }, "sentences": { "en": "The station receives telemetry from the probe.", "cn": "探测站接收来自探测器的遥测数据。", "ms": "Stesen menerima telemetri daripada kuar itu." } },
            { "word": "trajectory", "hint": "The path followed by a moving object.", "difficulty": "expert", "translations": { "cn": "轨道/弹道", "ms": "trajektori" }, "sentences": { "en": "The rocket's trajectory was plotted clearly.", "cn": "火箭的轨道被清晰地绘制出来。", "ms": "Trajektori roket telah diplotkan dengan jelas." } },
            { "word": "interstellar", "hint": "Occurring between the stars.", "difficulty": "expert", "translations": { "cn": "星际", "ms": "antara bintang" }, "sentences": { "en": "Voyager is traveling in interstellar space.", "cn": "旅行者号正在星际空间航行。", "ms": "Voyager sedang mengembara di ruang antara bintang." } },
            { "word": "propulsion", "hint": "The action of driving or pushing forward.", "difficulty": "expert", "translations": { "cn": "推进", "ms": "perejangan" }, "sentences": { "en": "Rocket propulsion is based on jet action.", "cn": "火箭推进是基于喷气作用的。", "ms": "Perejangan roket adalah berdasarkan tindakan pancutan." } },
            { "word": "stratosphere", "hint": "The layer of atmosphere above the troposphere.", "difficulty": "expert", "translations": { "cn": "平流层", "ms": "stratosfera" }, "sentences": { "en": "The stratosphere contains the ozone layer.", "cn": "平流层包含臭氧层。", "ms": "Stratosfera mengandungi lapisan ozon." } }
        ],
        "Animals": [
            { "word": "dog", "hint": "A common furry pet that barks.", "difficulty": "easy", "translations": { "cn": "狗", "ms": "anjing" }, "sentences": { "en": "The dog is wagging its tail.", "cn": "小狗在摇尾巴。", "ms": "Anjing itu sedang menggerakkan ekornya." } },
            { "word": "cat", "hint": "A common furry pet that meows.", "difficulty": "easy", "translations": { "cn": "猫", "ms": "kucing" }, "sentences": { "en": "The cat is sleeping on the sofa.", "cn": "猫正睡在沙发上。", "ms": "Kucing itu sedang tidur di atas sofa." } },
            { "word": "pig", "hint": "A pink farm animal with a curly tail.", "difficulty": "easy", "translations": { "cn": "猪", "ms": "babi" }, "sentences": { "en": "The pig lives in a pen.", "cn": "猪住在猪圈里。", "ms": "Babi itu tinggal di dalam kandang." } },
            { "word": "cow", "hint": "A large farm animal that gives milk.", "difficulty": "easy", "translations": { "cn": "奶牛", "ms": "lembu" }, "sentences": { "en": "The cow eats green grass.", "cn": "奶牛吃青草。", "ms": "Lembu itu makan rumput hijau." } },
            { "word": "duck", "hint": "A water bird that says quack.", "difficulty": "easy", "translations": { "cn": "鸭子", "ms": "itik" }, "sentences": { "en": "The duck swims in the pond.", "cn": "鸭子在池塘里游泳。", "ms": "Itik itu berenang di dalam kolam." } },
            { "word": "fish", "hint": "An animal that swims in water.", "difficulty": "easy", "translations": { "cn": "鱼", "ms": "ikan" }, "sentences": { "en": "The fish has colorful scales.", "cn": "这鱼有五颜六色的鳞片。", "ms": "Ikan itu mempunyai sisik yang berwarna-warni." } },
            { "word": "lion", "hint": "The king of the jungle.", "difficulty": "easy", "translations": { "cn": "狮子", "ms": "singa" }, "sentences": { "en": "The lion has a thick mane.", "cn": "狮子有浓密的鬃毛。", "ms": "Singa itu mempunyai bulu tengkuk yang tebal." } },
            { "word": "tiger", "hint": "A large striped cat.", "difficulty": "easy", "translations": { "cn": "老虎", "ms": "harimau" }, "sentences": { "en": "The tiger is a powerful hunter.", "cn": "老虎是一个强大的猎人。", "ms": "Harimau ialah pemburu yang kuat." } },
            { "word": "bird", "hint": "An animal that flies and has feathers.", "difficulty": "easy", "translations": { "cn": "鸟", "ms": "burung" }, "sentences": { "en": "The bird built a nest in the tree.", "cn": "鸟在树上筑了一个巢。", "ms": "Burung itu membina sarang di atas pokok." } },
            { "word": "frog", "hint": "A green animal that jumps.", "difficulty": "easy", "translations": { "cn": "青蛙", "ms": "katak" }, "sentences": { "en": "The frog catches flies with its tongue.", "cn": "青蛙用舌头抓苍蝇。", "ms": "Katak itu menangkap lalat dengan lidahnya." } },
            { "word": "monkey", "hint": "An animal that loves bananas.", "difficulty": "medium", "translations": { "cn": "猴子", "ms": "monyet" }, "sentences": { "en": "The monkey swings between trees.", "cn": "猴子在树间荡秋千。", "ms": "Monyet itu bergayut di antara pokok." } },
            { "word": "rabbit", "hint": "An animal with long ears and a fluffy tail.", "difficulty": "medium", "translations": { "cn": "兔子", "ms": "arnab" }, "sentences": { "en": "The rabbit eats crunchy carrots.", "cn": "兔子吃松脆的胡萝卜。", "ms": "Arnab itu makan lobak merah yang rangup." } },
            { "word": "horse", "hint": "A large animal people ride on.", "difficulty": "medium", "translations": { "cn": "马", "ms": "kuda" }, "sentences": { "en": "The horse runs fast across the field.", "cn": "马在田野上飞快地奔跑。", "ms": "Kuda itu berlari laju merentasi padang." } },
            { "word": "snake", "hint": "A long reptile with no legs.", "difficulty": "medium", "translations": { "cn": "蛇", "ms": "ular" }, "sentences": { "en": "The snake slithers through the grass.", "cn": "蛇在草丛中爬行。", "ms": "Ular itu menyusur melalui rumput." } },
            { "word": "turtle", "hint": "A slow reptile with a shell.", "difficulty": "medium", "translations": { "cn": "乌龟", "ms": "penyu/kura-kura" }, "sentences": { "en": "The turtle carries its home on its back.", "cn": "乌龟背着它的家。", "ms": "Kura-kura itu membawa rumah di atas belakangnya." } },
            { "word": "spider", "hint": "An eight-legged bug that spins webs.", "difficulty": "medium", "translations": { "cn": "蜘蛛", "ms": "lelabah" }, "sentences": { "en": "The spider is waiting in its web.", "cn": "蜘蛛在蜘蛛网中等待。", "ms": "Lelabah itu sedang menunggu di sarangnya." } },
            { "word": "giraffe", "hint": "An animal with a very long neck.", "difficulty": "medium", "translations": { "cn": "长颈鹿", "ms": "zirafah" }, "sentences": { "en": "The giraffe can reach the high leaves.", "cn": "长颈鹿可以够到高处的树叶。", "ms": "Zirafah itu boleh mencapai daun yang tinggi." } },
            { "word": "elephant", "hint": "A very large animal with a trunk.", "difficulty": "medium", "translations": { "cn": "大象", "ms": "gajah" }, "sentences": { "en": "The elephant uses its trunk to spray water.", "cn": "大象用象鼻喷水。", "ms": "Gajah itu menggunakan belalainya untuk menyembur air." } },
            { "word": "penguin", "hint": "A black and white bird that cannot fly.", "difficulty": "medium", "translations": { "cn": "企鹅", "ms": "penguin" }, "sentences": { "en": "Penguins are excellent swimmers.", "cn": "企鹅是游泳高手。", "ms": "Penguin ialah perenang yang hebat." } },
            { "word": "dolphin", "hint": "A smart marine mammal.", "difficulty": "medium", "translations": { "cn": "海豚", "ms": "ikan lumba-lumba" }, "sentences": { "en": "The dolphin jumped out of the sea.", "cn": "海豚从海里跳了出来。", "ms": "Ikan lumba-lumba itu melompat keluar dari laut." } },
            { "word": "kangaroo", "hint": "An Australian animal that hops.", "difficulty": "hard", "translations": { "cn": "袋鼠", "ms": "kanggaru" }, "sentences": { "en": "The kangaroo carries its baby in a pouch.", "cn": "袋鼠把幼崽放在育儿袋里。", "ms": "Kanggaru itu membawa anaknya di dalam kantung." } },
            { "word": "cheetah", "hint": "The fastest land animal.", "difficulty": "hard", "translations": { "cn": "猎豹", "ms": "citah" }, "sentences": { "en": "The cheetah can run incredibly fast.", "cn": "猎豹可以跑得非常快。", "ms": "Citah boleh berlari dengan sangat laju." } },
            { "word": "octopus", "hint": "A sea creature with eight arms.", "difficulty": "hard", "translations": { "cn": "章鱼", "ms": "sotong kurita" }, "sentences": { "en": "The octopus released ink to escape.", "cn": "章鱼喷出墨粉逃生。", "ms": "Sotong kurita itu mengeluarkan dakwat untuk melarikan diri." } },
            { "word": "hamster", "hint": "A small pet rodent.", "difficulty": "hard", "translations": { "cn": "仓鼠", "ms": "hamster" }, "sentences": { "en": "The hamster is running on its wheel.", "cn": "仓鼠在轮子上跑。", "ms": "Hamster itu sedang berlari di atas rodanya." } },
            { "word": "buffalo", "hint": "A large hairy wild ox.", "difficulty": "hard", "translations": { "cn": "水牛", "ms": "seladang/kerbau" }, "sentences": { "en": "The buffalo is very strong.", "cn": "水牛非常强壮。", "ms": "Seladang itu sangat kuat." } },
            { "word": "leopard", "hint": "A spotted wild cat.", "difficulty": "hard", "translations": { "cn": "豹", "ms": "harimau bintang" }, "sentences": { "en": "The leopard has many dark spots.", "cn": "豹子有许多黑点。", "ms": "Harimau bintang mempunyai banyak bintik gelap." } },
            { "word": "ostrich", "hint": "A large bird that cannot fly but runs fast.", "difficulty": "hard", "translations": { "cn": "鸵鸟", "ms": "burung unta" }, "sentences": { "en": "The ostrich is the world's largest bird.", "cn": "鸵鸟是世界上最大的鸟。", "ms": "Burung unta ialah burung yang paling besar di dunia." } },
            { "word": "vulture", "hint": "A bird that eats dead animals.", "difficulty": "hard", "translations": { "cn": "秃鹫", "ms": "burung bangkai" }, "sentences": { "en": "The vulture circled high in the sky.", "cn": "秃鹫在高空中盘旋。", "ms": "Burung bangkai itu berlegar-legar tinggi di langit." } },
            { "word": "badger", "hint": "A burrowing animal with black and white stripes.", "difficulty": "hard", "translations": { "cn": "獾", "ms": "badger" }, "sentences": { "en": "The badger lives in an underground burrow.", "cn": "獾住在地下洞穴里。", "ms": "Badger itu tinggal di dalam lubang bawah tanah." } },
            { "word": "walrus", "hint": "A sea animal with long tusks.", "difficulty": "hard", "translations": { "cn": "海象", "ms": "walrus" }, "sentences": { "en": "The walrus uses its tusks to climb onto ice.", "cn": "海象用它的长牙爬上冰面。", "ms": "Walrus itu menggunakan gadingnya untuk memanjat ais." } },
            { "word": "platypus", "hint": "An egg-laying mammal with a bill.", "difficulty": "expert", "translations": { "cn": "鸭嘴兽", "ms": "platipus" }, "sentences": { "en": "The platypus is a very unique animal.", "cn": "鸭嘴兽是一种非常独特的动物。", "ms": "Platipus ialah haiwan yang sangat unik." } },
            { "word": "armadillo", "hint": "An animal with a hard armor shell.", "difficulty": "expert", "translations": { "cn": "犰狳", "ms": "armadillo" }, "sentences": { "en": "An armadillo rolls into a ball for safety.", "cn": "犰狳卷成一团以求安全。", "ms": "Armadillo menggulung diri menjadi bola untuk keselamatan." } },
            { "word": "chameleon", "hint": "A lizard that changes color.", "difficulty": "expert", "translations": { "cn": "变色龙", "ms": "sesumpah" }, "sentences": { "en": "The chameleon blends in with the leaves.", "cn": "变色龙与叶子融为一体。", "ms": "Sesumpah itu menyamar dengan daun-daun." } },
            { "word": "porcupine", "hint": "An animal covered in sharp quills.", "difficulty": "expert", "translations": { "cn": "豪猪", "ms": "landak" }, "sentences": { "en": "Watch out for the porcupine's sharp quills.", "cn": "当心豪猪尖锐的刺。", "ms": "Hati-hati dengan duri landak yang tajam." } },
            { "word": "anteater", "hint": "An animal that eats ants with a long tongue.", "difficulty": "expert", "translations": { "cn": "食蚁兽", "ms": "tenggiling" }, "sentences": { "en": "The giant anteater searches for ant hills.", "cn": "大食蚁兽寻找蚁丘。", "ms": "Tenggiling gergasi mencari batas semut." } },
            { "word": "scorpio", "hint": "An arachnid with a poisonous sting.", "difficulty": "expert", "translations": { "cn": "蝎子", "ms": "kala jengking" }, "sentences": { "en": "A scorpio has a stinger at the end of its tail.", "cn": "蝎子的尾巴末端有一个毒刺。", "ms": "Kala jengking mempunyai penyengat di hujung ekornya." } },
            { "word": "tarantula", "hint": "A large hairy spider.", "difficulty": "expert", "translations": { "cn": "捕鸟蛛", "ms": "tarantula" }, "sentences": { "en": "The tarantula is a big, hairy spider.", "cn": "捕鸟蛛是一种大而多毛的蜘蛛。", "ms": "Tarantula ialah labah-labah yang besar and berbulu." } },
            { "word": "barracuda", "hint": "A large predatory tropical fish.", "difficulty": "expert", "translations": { "cn": "梭子鱼", "ms": "ikan alu-alu" }, "sentences": { "en": "The barracuda has sharp, pointed teeth.", "cn": "梭子鱼有锋利的尖牙。", "ms": "Ikan alu-alu mempunyai gigi yang tajam and runcing." } },
            { "word": "flamingo", "hint": "A tall pink wading bird.", "difficulty": "expert", "translations": { "cn": "火烈鸟", "ms": "flamingo" }, "sentences": { "en": "The flamingo stands on one leg.", "cn": "火烈鸟单腿站立。", "ms": "Burung flamingo itu berdiri dengan satu kaki." } },
            { "word": "hedgehog", "hint": "A small spiny mammal.", "difficulty": "expert", "translations": { "cn": "刺猬", "ms": "landak mini" }, "sentences": { "en": "A hedgehog curls up when it is scared.", "cn": "刺猬害怕时会蜷缩起来。", "ms": "Landak mini itu menggulung diri apabila takut." } },
            { "word": "marmot", "hint": "A large ground squirrel.", "difficulty": "expert", "translations": { "cn": "旱獭", "ms": "marmot" }, "sentences": { "en": "The marmot whistled to warn others.", "cn": "旱獭吹口哨警告其他同类。", "ms": "Marmot itu bersiul untuk memberi amaran kepada yang lain." } },
            { "word": "narwhal", "hint": "A small whale with a long tusk.", "difficulty": "expert", "translations": { "cn": "独角鲸", "ms": "narwhal" }, "sentences": { "en": "The narwhal is the unicorn of the sea.", "cn": "独角鲸是海里的独角兽。", "ms": "Narwhal ialah unicorn laut." } },
            { "word": "orangutan", "hint": "A large orange-haired ape.", "difficulty": "expert", "translations": { "cn": "红毛猩猩", "ms": "orang utan" }, "sentences": { "en": "Orangutans are native to Malaysia and Indonesia.", "cn": "红毛猩猩原产于马来西亚和印度尼西亚。", "ms": "Orang utan berasal dari Malaysia dan Indonesia." } },
            { "word": "pangolin", "hint": "A scaly anteater.", "difficulty": "expert", "translations": { "cn": "穿山甲", "ms": "tenggiling" }, "sentences": { "en": "The pangolin is protected because it is rare.", "cn": "穿山甲因其罕见面受到保护。", "ms": "Tenggiling dilindungi kerana ia jarang ditemui." } },
            { "word": "salamander", "hint": "An amphibian that looks like a lizard.", "difficulty": "expert", "translations": { "cn": "蝾螈", "ms": "salamander" }, "sentences": { "en": "The salamander lives in damp places.", "cn": "蝾螈生活在潮湿的地方。", "ms": "Salamander itu tinggal di tempat yang lembap." } },
            { "word": "anaconda", "hint": "A very large snake found in South America.", "difficulty": "expert", "translations": { "cn": "森蚺", "ms": "ular anaconda" }, "sentences": { "en": "The anaconda is a giant water snake.", "cn": "森蚺是一种巨大的水蛇。", "ms": "Ular anaconda ialah ular air yang gergasi." } },
            { "word": "capybara", "hint": "The largest rodent in the world.", "difficulty": "expert", "translations": { "cn": "水豚", "ms": "kapibara" }, "sentences": { "en": "The capybara loves to swim in the river.", "cn": "水豚喜欢在河里游泳。", "ms": "Kapibara suka berenang di dalam sungai." } },
            { "word": "wolverine", "hint": "A fierce carnivorous mammal.", "difficulty": "expert", "translations": { "cn": "狼獾", "ms": "wolverine" }, "sentences": { "en": "The wolverine is small but very fierce.", "cn": "狼獾虽然体型小，但非常凶猛。", "ms": "Wolverine bersaiz kecil tetapi sangat garang." } },
            { "word": "axolotl", "hint": "A Mexican walking fish.", "difficulty": "expert", "translations": { "cn": "美西螈", "ms": "aksolotl" }, "sentences": { "en": "The axolotl can regrow its limbs.", "cn": "美西螈可以重新长出四肢。", "ms": "Aksolotl boleh menumbuhkan semula anggota badannya." } },
            { "word": "komodo", "hint": "The largest living lizard.", "difficulty": "expert", "translations": { "cn": "科莫多巨蜥", "ms": "biawak komodo" }, "sentences": { "en": "The Komodo dragon has a dangerous bite.", "cn": "科莫多巨蜥的咬合力非常危险。", "ms": "Biawak komodo mempunyai gigitan yang pemangsa." } }
        ],
        "Food & Cooking": [
            { "word": "apple", "hint": "A common red or green fruit.", "difficulty": "easy", "translations": { "cn": "苹果", "ms": "epal" }, "sentences": { "en": "An apple a day keeps the doctor away.", "cn": "一日一苹果，医生远离我。", "ms": "Sebiji epal sehari menjauhkan kita daripada doktor." } },
            { "word": "bread", "hint": "A food made from flour and baked.", "difficulty": "easy", "translations": { "cn": "面包", "ms": "roti" }, "sentences": { "en": "I toast my bread for breakfast.", "cn": "我早餐吃烤面包。", "ms": "Saya bakar roti untuk sarapan." } },
            { "word": "milk", "hint": "A white liquid from cows.", "difficulty": "easy", "translations": { "cn": "牛奶", "ms": "susu" }, "sentences": { "en": "Drink milk to build strong bones.", "cn": "喝牛奶可以增强骨骼。", "ms": "Minum susu untuk membina tulang yang kuat." } },
            { "word": "egg", "hint": "A food laid by hens.", "difficulty": "easy", "translations": { "cn": "蛋", "ms": "telur" }, "sentences": { "en": "I like my egg scrambled.", "cn": "我喜欢吃炒蛋。", "ms": "Saya suka telur hancur." } },
            { "word": "cake", "hint": "A sweet baked dessert.", "difficulty": "easy", "translations": { "cn": "蛋糕", "ms": "kek" }, "sentences": { "en": "We had a big chocolate cake.", "cn": "我们吃了一个大巧克力蛋糕。", "ms": "Kami makan kek coklat yang besar." } },
            { "word": "rice", "hint": "A small white grain food.", "difficulty": "easy", "translations": { "cn": "米饭", "ms": "nasi" }, "sentences": { "en": "Nasi lemak is rice cooked in coconut milk.", "cn": "椰浆饭是用椰奶煮的米饭。", "ms": "Nasi lemak ialah nasi yang dimasak dalam santan kelapa." } },
            { "word": "soup", "hint": "A liquid food usually served hot.", "difficulty": "easy", "translations": { "cn": "汤", "ms": "sup" }, "sentences": { "en": "Hot soup is good on a rainy day.", "cn": "下雨天喝热汤很好。", "ms": "Sup panas sedap dimakan pada hari hujan." } },
            { "word": "fish", "hint": "Food from the sea or river.", "difficulty": "easy", "translations": { "cn": "鱼", "ms": "ikan" }, "sentences": { "en": "Fried fish is very tasty.", "cn": "煎鱼非常好吃。", "ms": "Ikan goreng sangat sedap." } },
            { "word": "pear", "hint": "A sweet fruit shaped like a bell.", "difficulty": "easy", "translations": { "cn": "梨", "ms": "buah pear" }, "sentences": { "en": "The pear is juicy and sweet.", "cn": "梨汁多味甜。", "ms": "Buah pear itu berjus dan manis." } },
            { "word": "corn", "hint": "A yellow vegetable on a cob.", "difficulty": "easy", "translations": { "cn": "玉米", "ms": "jagung" }, "sentences": { "en": "I love eating grilled corn.", "cn": "我喜欢吃烤玉米。", "ms": "Saya suka makan jagung bakar." } },
            { "word": "pizza", "hint": "Italian dish with cheese and tomato.", "difficulty": "medium", "translations": { "cn": "比萨饼", "ms": "piza" }, "sentences": { "en": "Let's order a pepperoni pizza.", "cn": "我们点一个意大利腊肠比萨吧。", "ms": "Mari kita pesan piza pepperoni." } },
            { "word": "pasta", "hint": "Italian food like spaghetti.", "difficulty": "medium", "translations": { "cn": "面食/意大利面", "ms": "pasta" }, "sentences": { "en": "Pasta is easy to cook.", "cn": "意大利面很容易做。", "ms": "Pasta mudah untuk dimasak." } },
            { "word": "cheese", "hint": "A dairy product made from milk.", "difficulty": "medium", "translations": { "cn": "奶酪", "ms": "keju" }, "sentences": { "en": "The mouse grabbed a piece of cheese.", "cn": "老鼠抓起了一块奶酪。", "ms": "Tikus itu mengambil sepotong keju." } },
            { "word": "cookie", "hint": "A small sweet biscuit.", "difficulty": "medium", "translations": { "cn": "饼干", "ms": "biskut" }, "sentences": { "en": "Chocolate chip cookies are my favorite.", "cn": "巧克力碎片饼干是我的最爱。", "ms": "Biskut coklat cip adalah kegemaran saya." } },
            { "word": "potato", "hint": "A starchy vegetable often fried.", "difficulty": "medium", "translations": { "cn": "马铃薯", "ms": "kentang" }, "sentences": { "en": "Mashed potato goes well with gravy.", "cn": "马铃薯泥和肉汁很搭。", "ms": "Kentang putar sangat sedap dengan kuah pekat." } },
            { "word": "banana", "hint": "A long yellow fruit.", "difficulty": "medium", "translations": { "cn": "香蕉", "ms": "pisang" }, "sentences": { "en": "Bananas are rich in potassium.", "cn": "香蕉富含钾。", "ms": "Pisang kaya dengan kalium." } },
            { "word": "tomato", "hint": "A red fruit used as a vegetable.", "difficulty": "medium", "translations": { "cn": "番茄", "ms": "tomat" }, "sentences": { "en": "Tomato sauce is used on pizza.", "cn": "番茄酱是用在比萨上的。", "ms": "Sos tomato digunakan di atas piza." } },
            { "word": "burger", "hint": "Meat in a bun with lettuce.", "difficulty": "medium", "translations": { "cn": "汉堡", "ms": "burger" }, "sentences": { "en": "I want a beef burger with extra cheese.", "cn": "我要一个加芝士的牛肉汉堡。", "ms": "Saya mahu burger daging dengan keju tambahan." } },
            { "word": "steak", "hint": "A thick slice of meat.", "difficulty": "medium", "translations": { "cn": "牛排", "ms": "stik" }, "sentences": { "en": "The steak was cooked medium-rare.", "cn": "牛排煮到了五分熟。", "ms": "Stik itu dimasak secara sederhana." } },
            { "word": "salad", "hint": "A mixture of raw vegetables.", "difficulty": "medium", "translations": { "cn": "沙拉", "ms": "salad" }, "sentences": { "en": "A fresh green salad is healthy.", "cn": "新鲜的绿色沙拉很健康。", "ms": "Salad hijau yang segar adalah sihat." } },
            { "word": "spaghetti", "hint": "Long thin Italian noodles.", "difficulty": "hard", "translations": { "cn": "意大利细面条", "ms": "spageti" }, "sentences": { "en": "Spaghetti Bolognese is a popular dish.", "cn": "肉酱意大利面是一道深受欢迎的菜肴。", "ms": "Spageti Bolognese ialah hidangan yang popular." } },
            { "word": "broccoli", "hint": "A green vegetable with a thick stalk.", "difficulty": "hard", "translations": { "cn": "西兰花", "ms": "brokoli" }, "sentences": { "en": "Broccoli looks like a tiny tree.", "cn": "西兰花看起来像一棵小树。", "ms": "Brokoli kelihatan seperti pokok kecil." } },
            { "word": "sandwich", "hint": "Filling between two slices of bread.", "difficulty": "hard", "translations": { "cn": "三明治", "ms": "sandwic" }, "sentences": { "en": "I packed a tuna sandwich for lunch.", "cn": "我午餐带了一个金枪鱼三明治。", "ms": "Saya bungkus sandwic tuna untuk makan tengah hari." } },
            { "word": "pancake", "hint": "A flat round cake fried in a pan.", "difficulty": "hard", "translations": { "cn": "薄煎饼", "ms": "lempeng" }, "sentences": { "en": "We eat pancakes with maple syrup.", "cn": "我们吃薄煎饼配枫糖浆。", "ms": "Kami makan lempeng dengan sirap maple." } },
            { "word": "omelette", "hint": "Beaten eggs fried with butter.", "difficulty": "hard", "translations": { "cn": "煎蛋卷", "ms": "telur dadar" }, "sentences": { "en": "A mushroom omelette is a great breakfast.", "cn": "蘑菇煎蛋卷是一顿很棒的早餐。", "ms": "Telur dadar cendawan ialah sarapan yang hebat." } },
            { "word": "biscuit", "hint": "A small baked sweet or savory cake.", "difficulty": "hard", "translations": { "cn": "饼干", "ms": "biskut" }, "sentences": { "en": "I dipped my biscuit in the tea.", "cn": "我把饼干浸在茶里。", "ms": "Saya mencelup biskut saya ke dalam teh." } },
            { "word": "cupcake", "hint": "A small cake for one person.", "difficulty": "hard", "translations": { "cn": "纸杯蛋糕", "ms": "kek cawan" }, "sentences": { "en": "She decorated the cupcakes with frosting.", "cn": "她在纸杯蛋糕上装饰了糖霜。", "ms": "Dia menghias kek cawan dengan aising." } },
            { "word": "lasagna", "hint": "Layered Italian pasta dish.", "difficulty": "hard", "translations": { "cn": "千层面", "ms": "lasagna" }, "sentences": { "en": "Mother makes the best cheesy lasagna.", "cn": "妈妈做的奶酪千层面最好吃。", "ms": "Ibu membuat lasagna keju yang paling sedap." } },
            { "word": "smoothie", "hint": "Thick fruit drink with milk.", "difficulty": "hard", "translations": { "cn": "奶昔/果昔", "ms": "smoothie" }, "sentences": { "en": "I drink a strawberry smoothie after gym.", "cn": "健身后我喝一杯草莓奶昔。", "ms": "Saya minum smoothie strawberi selepas ke gim." } },
            { "word": "yogurt", "hint": "A thick creamy food made from milk.", "difficulty": "hard", "translations": { "cn": "酸奶", "ms": "yogurt" }, "sentences": { "en": "Yogurt with honey is very delicious.", "cn": "加了蜂蜜的酸奶非常美味。", "ms": "Yogurt dengan madu sangat sedap." } },
            { "word": "croissant", "hint": "A flaky French pastry.", "difficulty": "expert", "translations": { "cn": "羊角面包", "ms": "kroisan" }, "sentences": { "en": "The croissant is buttery and flaky.", "cn": "羊角面包有奶油香味且酥脆。", "ms": "Kroisan itu bermentega dan rapuh." } },
            { "word": "baguette", "hint": "A long thin loaf of French bread.", "difficulty": "expert", "translations": { "cn": "法式长棍面包", "ms": "baguette" }, "sentences": { "en": "We bought a fresh baguette from the bakery.", "cn": "我们从面包店买了一个新鲜的法式长棍面包。", "ms": "Kami membeli baguette segar dari kedai roti." } },
            { "word": "tiramisu", "hint": "An Italian coffee-flavored dessert.", "difficulty": "expert", "translations": { "cn": "提拉米苏", "ms": "tiramisu" }, "sentences": { "en": "Tiramisu has layers of coffee-soaked cake.", "cn": "提拉米苏有用咖啡浸泡过的蛋糕层。", "ms": "Tiramisu mempunyai lapisan kek yang direndam kopi." } },
            { "word": "guacamole", "hint": "An avocado-based dip.", "difficulty": "expert", "translations": { "cn": "牛油果酱", "ms": "guacamole" }, "sentences": { "en": "Guacamole is perfect with tortilla chips.", "cn": "牛油果酱与玉米片是绝配。", "ms": "Guacamole sangat sesuai dengan cip tortilla." } },
            { "word": "bruschetta", "hint": "Toasted bread with oil and garlic.", "difficulty": "expert", "translations": { "cn": "布切塔/意式烤面包", "ms": "bruschetta" }, "sentences": { "en": "Bruschetta is a great Italian appetizer.", "cn": "布切塔是一道很棒的意大利开胃菜。", "ms": "Bruschetta ialah pembuka selera Itali yang hebat." } },
            { "word": "ratatouille", "hint": "A French vegetable stew.", "difficulty": "expert", "translations": { "cn": "普罗旺斯炖菜", "ms": "ratatouille" }, "sentences": { "en": "Ratatouille is made with many vegetables.", "cn": "普罗旺斯炖菜是用许多蔬菜做成的。", "ms": "Ratatouille dibuat dengan pelbagai jenis sayur-sayuran." } },
            { "word": "quinoa", "hint": "A grain from South America.", "difficulty": "expert", "translations": { "cn": "藜麦", "ms": "quinoa" }, "sentences": { "en": "Quinoa is a very healthy grain.", "cn": "藜麦是一种非常健康的谷物。", "ms": "Quinoa ialah bijirin yang sangat sihat." } },
            { "word": "hummus", "hint": "A dip made from chickpeas.", "difficulty": "expert", "translations": { "cn": "鹰嘴豆泥", "ms": "hummus" }, "sentences": { "en": "I like dipping carrots in hummus.", "cn": "我喜欢用胡萝卜蘸鹰嘴豆泥吃。", "ms": "Saya suka mencelup lobak merah ke dalam hummus." } },
            { "word": "falafel", "hint": "Deep-fried balls of chickpeas.", "difficulty": "expert", "translations": { "cn": "炸丸子/法拉费", "ms": "falafel" }, "sentences": { "en": "Falafel is often served in pita bread.", "cn": "法拉费通常盛在皮塔面包里食用。", "ms": "Falafel selalunya dihidangkan dalam roti pita." } },
            { "word": "espresso", "hint": "Strong black coffee.", "difficulty": "expert", "translations": { "cn": "浓缩咖啡", "ms": "espresso" }, "sentences": { "en": "An espresso is a small, strong coffee.", "cn": "浓缩咖啡是一小杯浓咖啡。", "ms": "Espresso ialah kopi yang pekat dan dalam kuantiti yang sedikit." } },
            { "word": "macaroni", "hint": "Tube-shaped pasta.", "difficulty": "expert", "translations": { "cn": "通心粉", "ms": "makaroni" }, "sentences": { "en": "Macaroni and cheese is comfort food.", "cn": "奶酪通心粉是一道令人舒心的食物。", "ms": "Makaroni keju ialah makanan yang menyelesakan." } },
            { "word": "souffle", "hint": "A light fluffy baked dish.", "difficulty": "expert", "translations": { "cn": "舒芙蕾", "ms": "sufle" }, "sentences": { "en": "A souffle must be served immediately.", "cn": "舒芙蕾必须立即食用。", "ms": "Sufle mesti dihidangkan dengan segera." } },
            { "word": "risotto", "hint": "An Italian rice dish.", "difficulty": "expert", "translations": { "cn": "意大利调味饭/利梭多", "ms": "risotto" }, "sentences": { "en": "Risotto requires constant stirring.", "cn": "利梭多需要不断地搅拌。", "ms": "Risotto memerlukan kacauan yang berterusan." } },
            { "word": "tortilla", "hint": "A thin flat corn or flour bread.", "difficulty": "expert", "translations": { "cn": "玉米饼/薄饼", "ms": "tortila" }, "sentences": { "en": "Wraps can be made with a large tortilla.", "cn": "卷饼可以用一个大薄饼做成。", "ms": "Balutan boleh dibuat menggunakan tortila yang besar." } },
            { "word": "chipotle", "hint": "A smoked chili pepper.", "difficulty": "expert", "translations": { "cn": "烟熏辣椒", "ms": "chipotle" }, "sentences": { "en": "Chipotle gives the sauce a smoky flavor.", "cn": "烟熏辣椒赋予酱汁一种烟熏味。", "ms": "Chipotle memberikan rasa salai pada sos." } },
            { "word": "moussaka", "hint": "A Greek eggplant dish.", "difficulty": "expert", "translations": { "cn": "穆萨卡", "ms": "moussaka" }, "sentences": { "en": "Moussaka is a traditional Greek dish.", "cn": "穆萨卡是一道传统的希腊菜肴。", "ms": "Moussaka ialah hidangan tradisional Greek." } },
            { "word": "ganache", "hint": "A glaze or filling made from chocolate and cream.", "difficulty": "expert", "translations": { "cn": "甘纳许", "ms": "ganache" }, "sentences": { "en": "Spread the chocolate ganache over the cake.", "cn": "将巧克力甘纳许涂在蛋糕上。", "ms": "Sapukan ganache coklat di atas kek." } },
            { "word": "zucchini", "hint": "A green summer squash.", "difficulty": "expert", "translations": { "cn": "西葫芦", "ms": "zukini" }, "sentences": { "en": "Zucchini can be grilled or roasted.", "cn": "西葫芦可以烤制或烘烤。", "ms": "Zukini boleh dipanggang atau dibakar." } },
            { "word": "halibut", "hint": "A large flat sea fish.", "difficulty": "expert", "translations": { "cn": "大比目鱼", "ms": "halibut" }, "sentences": { "en": "Halibut is a popular choice for baking.", "cn": "大比目鱼是烘焙的热门选择。", "ms": "Halibut ialah pilihan popular untuk dibakar." } },
            { "word": "meringue", "hint": "A sweet made from egg whites and sugar.", "difficulty": "expert", "translations": { "cn": "蛋白酥", "ms": "meringue" }, "sentences": { "en": "The lemon meringue pie looked lovely.", "cn": "柠檬蛋白酥派看起来很诱人。", "ms": "Pai meringue lemon itu kelihatan cantik." } }
        ],
        "Technology": [
            { "word": "mouse", "hint": "A device used to point on a screen.", "difficulty": "easy", "translations": { "cn": "鼠标", "ms": "tetikus" }, "sentences": { "en": "Move the mouse to click the button.", "cn": "移动鼠标以点击按钮。", "ms": "Gerakkan tetikus untuk klik butang." } },
            { "word": "code", "hint": "Instructions for a computer.", "difficulty": "easy", "translations": { "cn": "代码", "ms": "kod" }, "sentences": { "en": "We are learning to write computer code.", "cn": "我们正在学习编写计算机代码。", "ms": "Kami sedang belajar menulis kod komputer." } },
            { "word": "web", "hint": "Short for World Wide Web.", "difficulty": "easy", "translations": { "cn": "网络", "ms": "web" }, "sentences": { "en": "The web connects people globally.", "cn": "网络将全球的人们连接在一起。", "ms": "Web menghubungkan orang di seluruh dunia." } },
            { "word": "app", "hint": "A software application.", "difficulty": "easy", "translations": { "cn": "应用", "ms": "aplikasi" }, "sentences": { "en": "I downloaded a new game app.", "cn": "我下载了一个新的游戏应用。", "ms": "Saya memuat turun aplikasi permainan baharu." } },
            { "word": "data", "hint": "Information processed by a computer.", "difficulty": "easy", "translations": { "cn": "数据", "ms": "data" }, "sentences": { "en": "The computer stores a lot of data.", "cn": "计算机存储了大量数据。", "ms": "Komputer menyimpan banyak data." } },
            { "word": "link", "hint": "A connection between web pages.", "difficulty": "easy", "translations": { "cn": "链接", "ms": "pautan" }, "sentences": { "en": "Click the link to open the website.", "cn": "点击链接以打开网站。", "ms": "Klik pautan untuk membuka laman web." } },
            { "word": "file", "hint": "A collection of related data.", "difficulty": "easy", "translations": { "cn": "文件", "ms": "fail" }, "sentences": { "en": "Save your work in a new file.", "cn": "将你的工作保存在新文件中。", "ms": "Simpan kerja anda dalam fail baharu." } },
            { "word": "disk", "hint": "A device for storing data.", "difficulty": "easy", "translations": { "cn": "磁盘", "ms": "cakera" }, "sentences": { "en": "The data is stored on the hard disk.", "cn": "数据存储在硬盘上。", "ms": "Data disimpan di dalam cakera keras." } },
            { "word": "unit", "hint": "A component of a computer.", "difficulty": "easy", "translations": { "cn": "单元/部件", "ms": "unit" }, "sentences": { "en": "The system unit is the brain of the PC.", "cn": "系统单元是个人电脑的大脑。", "ms": "Unit sistem ialah otak bagi PC itu." } },
            { "word": "mail", "hint": "Electronic messages.", "difficulty": "easy", "translations": { "cn": "邮件", "ms": "mel" }, "sentences": { "en": "I sent an email to my teacher.", "cn": "我给老师发了一封电子邮件。", "ms": "Saya menghantar e-mel kepada guru saya." } },
            { "word": "computer", "hint": "An electronic machine for processing data.", "difficulty": "medium", "translations": { "cn": "电脑", "ms": "komputer" }, "sentences": { "en": "I use my computer for homework.", "cn": "我用电脑做作业。", "ms": "Saya menggunakan komputer untuk kerja sekolah." } },
            { "word": "internet", "hint": "A global network of computers.", "difficulty": "medium", "translations": { "cn": "互联网", "ms": "internet/talian" }, "sentences": { "en": "The internet is a vast source of info.", "cn": "互联网是一个巨大的信息源。", "ms": "Internet ialah sumber maklumat yang luas." } },
            { "word": "keyboard", "hint": "A device with keys for typing.", "difficulty": "medium", "translations": { "cn": "键盘", "ms": "papan kekunci" }, "sentences": { "en": "Type your name on the keyboard.", "cn": "在键盘上输入你的名字。", "ms": "Taip nama anda pada papan kekunci." } },
            { "word": "monitor", "hint": "A screen that displays output.", "difficulty": "medium", "translations": { "cn": "显示器", "ms": "monitor/skrin" }, "sentences": { "en": "The monitor shows clear images.", "cn": "显示器显示清晰的图像。", "ms": "Monitor itu menunjukkan imej yang jelas." } },
            { "word": "software", "hint": "Programs used by a computer.", "difficulty": "medium", "translations": { "cn": "软件", "ms": "perisian" }, "sentences": { "en": "Install the new software on your PC.", "cn": "在你的电脑上安装新软件。", "ms": "Pasang perisian baharu pada PC anda." } },
            { "word": "hardware", "hint": "Physical parts of a computer.", "difficulty": "medium", "translations": { "cn": "硬件", "ms": "perkakasan" }, "sentences": { "en": "Hardware includes components like the CPU.", "cn": "硬件包括中央处理器等组件。", "ms": "Perkakasan termasuk komponen seperti CPU." } },
            { "word": "laptop", "hint": "A portable computer.", "difficulty": "medium", "translations": { "cn": "笔记本电脑", "ms": "komputer riba" }, "sentences": { "en": "I carry my laptop in a bag.", "cn": "我把笔记本电脑放在包里。", "ms": "Saya membawa komputer riba saya di dalam beg." } },
            { "word": "battery", "hint": "A portable power source.", "difficulty": "medium", "translations": { "cn": "电池", "ms": "bateri" }, "sentences": { "en": "The phone battery lasts all day.", "cn": "电话电池可以维持一整天。", "ms": "Bateri telefon itu tahan sepanjang hari." } },
            { "word": "network", "hint": "Connected computers.", "difficulty": "medium", "translations": { "cn": "网络", "ms": "rangkaian" }, "sentences": { "en": "The office has a fast network.", "cn": "办公室有一个快速的网络。", "ms": "Pejabat itu mempunyai rangkaian yang laju." } },
            { "word": "server", "hint": "A computer that provides data to others.", "difficulty": "medium", "translations": { "cn": "服务器", "ms": "pelayan" }, "sentences": { "en": "The server stores all the files.", "cn": "服务器存储所有文件。", "ms": "Pelayan itu menyimpan semua fail." } },
            { "word": "smartphone", "hint": "A mobile phone with computer features.", "difficulty": "hard", "translations": { "cn": "智能手机", "ms": "telefon pintar" }, "sentences": { "en": "A smartphone can run many apps.", "cn": "智能手机可以运行许多应用。", "ms": "Telefon pintar boleh menjalankan banyak aplikasi." } },
            { "word": "robotics", "hint": "Science of designing robots.", "difficulty": "hard", "translations": { "cn": "机器人学", "ms": "robotik" }, "sentences": { "en": "Robotics is an exciting field of study.", "cn": "机器人学是一个令人兴奋的研究领域。", "ms": "Robotik ialah bidang pengajian yang menarik." } },
            { "word": "database", "hint": "Structured set of data.", "difficulty": "hard", "translations": { "cn": "数据库", "ms": "pangkalan data" }, "sentences": { "en": "The database contains user records.", "cn": "数据库包含用户记录。", "ms": "Pangkalan data itu mengandungi rekod pengguna." } },
            { "word": "security", "hint": "Protection for computer systems.", "difficulty": "hard", "translations": { "cn": "安全", "ms": "keselamatan" }, "sentences": { "en": "Cyber security is very important.", "cn": "网络安全非常重要。", "ms": "Keselamatan siber sangat penting." } },
            { "word": "firewall", "hint": "A system to prevent unauthorized access.", "difficulty": "hard", "translations": { "cn": "防火墙", "ms": "tembok api" }, "sentences": { "en": "The firewall protects the computer.", "cn": "防火墙保护计算机。", "ms": "Tembok api melindungi komputer." } },
            { "word": "algorithm", "hint": "A set of rules for solving a task.", "difficulty": "hard", "translations": { "cn": "算法", "ms": "algoritma" }, "sentences": { "en": "An algorithm helps the computer solve problems.", "cn": "算法帮助计算机解决问题。", "ms": "Algoritma membantu komputer menyelesaikan masalah." } },
            { "word": "processor", "hint": "The brain of the computer.", "difficulty": "hard", "translations": { "cn": "处理器", "ms": "pemproses" }, "sentences": { "en": "The processor is a very fast chip.", "cn": "处理器是一个速度非常快的芯片。", "ms": "Pemproses ialah cip yang sangat laju." } },
            { "word": "password", "hint": "A secret word for access.", "difficulty": "hard", "translations": { "cn": "密码", "ms": "kata laluan" }, "sentences": { "en": "Keep your password secret and safe.", "cn": "保持你的密码秘密且安全。", "ms": "Pastikan kata laluan anda rahsia dan selamat." } },
            { "word": "browser", "hint": "A program for viewing websites.", "difficulty": "hard", "translations": { "cn": "浏览器", "ms": "pelayar" }, "sentences": { "en": "Use a web browser to surf the net.", "cn": "使用网页浏览器上网。", "ms": "Gunakan pelayar web untuk melayari internet." } },
            { "word": "cloud", "hint": "Internet-based storage and services.", "difficulty": "hard", "translations": { "cn": "云端", "ms": "awan" }, "sentences": { "en": "Store your photos in the cloud.", "cn": "将你的照片储存在云端。", "ms": "Simpan foto anda di dalam awan." } },
            { "word": "encryption", "hint": "Converting data into secret code.", "difficulty": "expert", "translations": { "cn": "加密", "ms": "penyahkodan/enkripsi" }, "sentences": { "en": "Encryption protects your private messages.", "cn": "加密保护你的私人信息。", "ms": "Enkripsi melindungi mesej peribadi anda." } },
            { "word": "artificial", "hint": "Intelligence made by machines.", "difficulty": "expert", "translations": { "cn": "人工智能", "ms": "kecerdasan buatan" }, "sentences": { "en": "Artificial intelligence is changing the world.", "cn": "人工智能正在改变世界。", "ms": "Kecerdasan buatan sedang mengubah dunia." } },
            { "word": "blockchain", "hint": "A digital ledger of transactions.", "difficulty": "expert", "translations": { "cn": "区块链", "ms": "blok rantai" }, "sentences": { "en": "Blockchain is used for secure transactions.", "cn": "区块链用于安全交易。", "ms": "Blok rantai digunakan untuk transaksi yang selamat." } },
            { "word": "interface", "hint": "Point where components meet.", "difficulty": "expert", "translations": { "cn": "界面/接口", "ms": "antara muka" }, "sentences": { "en": "The user interface is easy to navigate.", "cn": "用户界面易于导航。", "ms": "Antara muka pengguna mudah untuk dilayari." } },
            { "word": "bandwidth", "hint": "Data transfer capacity.", "difficulty": "expert", "translations": { "cn": "带宽", "ms": "lebar jalur" }, "sentences": { "en": "Streaming video needs high bandwidth.", "cn": "流媒体视频需要高带宽。", "ms": "Penstriman video memerlukan lebar jalur yang tinggi." } },
            { "word": "protocol", "hint": "Rules for data communication.", "difficulty": "expert", "translations": { "cn": "协议", "ms": "protokol" }, "sentences": { "en": "HTTP is a common web protocol.", "cn": "HTTP是一种常见的网页协议。", "ms": "HTTP ialah protokol web yang biasa." } },
            { "word": "mainframe", "hint": "A large powerful computer.", "difficulty": "expert", "translations": { "cn": "大型机", "ms": "kerangka utama" }, "sentences": { "en": "Banks use mainframes for processing data.", "cn": "银行使用大型机处理数据。", "ms": "Bank menggunakan kerangka utama untuk memproses data." } },
            { "word": "firmware", "hint": "Software programmed into hardware.", "difficulty": "expert", "translations": { "cn": "固件", "ms": "perisian tegar" }, "sentences": { "en": "Update the firmware on your router.", "cn": "在你路由器上更新固件。", "ms": "Kemas kini perisian tegar pada penghala anda." } },
            { "word": "nanotechnology", "hint": "Science of very small things.", "difficulty": "expert", "translations": { "cn": "纳米技术", "ms": "nanoteknologi" }, "sentences": { "en": "Nanotechnology works at a molecular level.", "cn": "纳米技术在分子水平上运作。", "ms": "Nanoteknologi berfungsi pada tahap molekul." } },
            { "word": "virtualization", "hint": "Creating a virtual version of something.", "difficulty": "expert", "translations": { "cn": "虚拟化", "ms": "pemayaan/virtualisasi" }, "sentences": { "en": "Virtualization helps save hardware costs.", "cn": "虚拟化有助于节省硬件成本。", "ms": "Virtualisasi membantu menjimatkan kos perkakasan." } },
            { "word": "cybersecurity", "hint": "Protection of networks and data.", "difficulty": "expert", "translations": { "cn": "网络安全", "ms": "keselamatan siber" }, "sentences": { "en": "Cybersecurity prevents hacker attacks.", "cn": "网络安全防止黑客攻击。", "ms": "Keselamatan siber menghalang serangan penggodam." } },
            { "word": "compilation", "hint": "Converting code to machine language.", "difficulty": "expert", "translations": { "cn": "编译", "ms": "kompilasi" }, "sentences": { "en": "The compilation process found three errors.", "cn": "编译过程发现了三个错误。", "ms": "Proses kompilasi menemui tiga ralat." } },
            { "word": "microchip", "hint": "A tiny electronic circuit.", "difficulty": "expert", "translations": { "cn": "微芯片", "ms": "cip mikro" }, "sentences": { "en": "A microchip is made of silicon.", "cn": "微芯片由硅制成。", "ms": "Cip mikro diperbuat daripada silikon." } },
            { "word": "cryptography", "hint": "Science of secure communication.", "difficulty": "expert", "translations": { "cn": "密码学", "ms": "kriptografi" }, "sentences": { "en": "Cryptography is vital for online banking.", "cn": "密码学对网上银行至关重要。", "ms": "Kriptografi sangat penting untuk perbankan dalam talian." } },
            { "word": "biometrics", "hint": "Using body traits for identity.", "difficulty": "expert", "translations": { "cn": "生物识别", "ms": "biometrik" }, "sentences": { "en": "Face ID is a form of biometrics.", "cn": "面容识别是生物识别的一种形式。", "ms": "Face ID ialah satu bentuk biometrik." } },
            { "word": "augmented", "hint": "Reality enhanced by technology.", "difficulty": "expert", "translations": { "cn": "增强 reality", "ms": "imbuhan/peningkatan" }, "sentences": { "en": "Augmented reality adds layers to the world.", "cn": "增强现实为世界增加了层次。", "ms": "Realiti imbuhan menambah lapisan kepada dunia." } },
            { "word": "telecommunications", "hint": "Communication over long distances.", "difficulty": "expert", "translations": { "cn": "电信", "ms": "telekomunikasi" }, "sentences": { "en": "The telecommunications industry is huge.", "cn": "电信行业规模巨大。", "ms": "Industri telekomunikasi sangat besar." } },
            { "word": "multimedia", "hint": "Content using various forms.", "difficulty": "expert", "translations": { "cn": "多媒体", "ms": "multimedia" }, "sentences": { "en": "Multimedia presentations are engaging.", "cn": "多媒体演示很有吸引力。", "ms": "Persembahan multimedia sangat menarik." } },
            { "word": "architecture", "hint": "The design of computer systems.", "difficulty": "expert", "translations": { "cn": "体系结构", "ms": "seni bina" }, "sentences": { "en": "System architecture defines how parts interact.", "cn": "体系结构定义了各部分如何交互。", "ms": "Seni bina sistem menentukan bagaimana bahagian berinteraksi." } }
        ]
    },
    "Verbs": {
        "Past Simple": [
            { "word": "went", "hint": "The Past Simple of verb 'go'", "translations": { "cn": "去", "ms": "pergi" }, "sentences": { "en": "Ali went to the night market.", "cn": "阿里去了夜市。", "ms": "Ali telah pergi ke pasar malam." } },
            { "word": "ate", "hint": "The Past Simple of verb 'eat'", "translations": { "cn": "吃", "ms": "makan" }, "sentences": { "en": "I ate a delicious nasi lemak this morning.", "cn": "我今早吃了一份美味的椰浆饭。", "ms": "Saya makan nasi lemak yang sedap pagi tadi." } },
            { "word": "saw", "hint": "The Past Simple of verb 'see'", "translations": { "cn": "看见", "ms": "melihat/nampak" }, "sentences": { "en": "We saw a tapir at the National Zoo.", "cn": "我们在国家动物园看到了一只马来貘。", "ms": "Kami melihat seekor tapir di Zoo Negara." } },
            { "word": "bought", "hint": "The Past Simple of verb 'buy'", "translations": { "cn": "买", "ms": "membeli" }, "sentences": { "en": "She bought some batik from Terengganu.", "cn": "她从登嘉楼买了一些巴迪布。", "ms": "Dia membeli kain batik dari Terengganu." } },
            { "word": "brought", "hint": "The Past Simple of verb 'bring'", "translations": { "cn": "带来", "ms": "membawa" }, "sentences": { "en": "He brought durians to the kampung.", "cn": "他把榴莲带回了甘榜。", "ms": "Dia membawa durian ke kampung." } },
            { "word": "drank", "hint": "The Past Simple of verb 'drink'", "translations": { "cn": "喝", "ms": "minum" }, "sentences": { "en": "I drank a cold teh tarik.", "cn": "我喝了一杯冷的拉茶。", "ms": "Saya minum teh tarik sejuk." } },
            { "word": "caught", "hint": "The Past Simple of verb 'catch'", "translations": { "cn": "抓", "ms": "menangkap" }, "sentences": { "en": "My father caught a large fish in the river.", "cn": "我父亲在河里捉到了一条大鱼。", "ms": "Bapa saya menangkap seekor ikan besar di sungai." } },
            { "word": "made", "hint": "The Past Simple of verb 'make'", "translations": { "cn": "制作/做", "ms": "membuat" }, "sentences": { "en": "Mother made traditional kuih for us.", "cn": "妈妈为我们制作了传统的糕点。", "ms": "Ibu membuat kuih tradisional untuk kami." } },
            { "word": "took", "hint": "The Past Simple of verb 'take'", "translations": { "cn": "拿/乘坐", "ms": "mengambil/menaiki" }, "sentences": { "en": "They took the LRT to KLCC.", "cn": "他们乘坐轻轨去了吉隆坡城中城。", "ms": "Mereka menaiki LRT ke KLCC." } },
            { "word": "gave", "hint": "The Past Simple of verb 'give'", "translations": { "cn": "给", "ms": "memberi" }, "sentences": { "en": "Grandparents gave us 'duit raya'.", "cn": "祖父母给了我们‘青包’。", "ms": "Datuk dan nenek memberi kami duit raya." } },
            { "word": "flew", "hint": "The Past Simple of verb 'fly'", "translations": { "cn": "飞/放飞", "ms": "terbang/menerbangkan" }, "sentences": { "en": "We flew a wau in the field.", "cn": "我们在田野里放飞了月亮风筝。", "ms": "Kami menerbangkan wau di padang." } },
            { "word": "ran", "hint": "The Past Simple of verb 'run'", "translations": { "cn": "跑", "ms": "berlari" }, "sentences": { "en": "The boy ran fast to catch the school bus.", "cn": "男孩跑得很快去赶校车。", "ms": "Budak lelaki itu berlari pantas untuk mengejar bas sekolah." } },
            { "word": "slept", "hint": "The Past Simple of verb 'sleep'", "translations": { "cn": "睡觉", "ms": "tidur" }, "sentences": { "en": "The cat slept quietly under the car.", "cn": "猫在车底下安静地睡觉。", "ms": "Kucing itu tidur dengan senyap di bawah kereta." } },
            { "word": "swam", "hint": "The Past Simple of verb 'swim'", "translations": { "cn": "游泳", "ms": "berenang" }, "sentences": { "en": "We swam in the clear water of Pulau Redang.", "cn": "我们在热浪岛清澈的水中游泳。", "ms": "Kami berenang di air jernih Pulau Redang." } },
            { "word": "woke", "hint": "The Past Simple of verb 'wake'", "translations": { "cn": "醒来", "ms": "bangun" }, "sentences": { "en": "I woke up early for Hari Raya.", "cn": "我开斋节很早就醒了。", "ms": "Saya bangun awal untuk Hari Raya." } },
            { "word": "wrote", "hint": "The Past Simple of verb 'write'", "translations": { "cn": "写", "ms": "menulis" }, "sentences": { "en": "He wrote a letter to his pen pal in Sabah.", "cn": "他写信给他在沙巴的笔友。", "ms": "Dia menulis surat kepada sahabat penanya di Sabah." } },
            { "word": "read", "hint": "The Past Simple of verb 'read'", "translations": { "cn": "阅读", "ms": "membaca" }, "sentences": { "en": "She read a story about Hang Tuah.", "cn": "她读了一个关于汉都亚的故事。", "ms": "Dia membaca cerita tentang Hang Tuah." } },
            { "word": "spoke", "hint": "The Past Simple of verb 'speak'", "translations": { "cn": "说话", "ms": "bercakap" }, "sentences": { "en": "The teacher spoke nicely to the students.", "cn": "老师对学生们讲得很好。", "ms": "Guru bercakap dengan baik kepada pelajar-pelajarnya." } },
            { "word": "stood", "hint": "The Past Simple of verb 'stand'", "translations": { "cn": "站立", "ms": "berdiri" }, "sentences": { "en": "Everyone stood up to sing the national anthem.", "cn": "大家都站起来唱国歌。", "ms": "Semua orang berdiri untuk menyanyikan lagu kebangsaan." } },
            { "word": "won", "hint": "The Past Simple of verb 'win'", "translations": { "cn": "赢", "ms": "menang" }, "sentences": { "en": "Our school won the badminton tournament.", "cn": "我们学校赢得了羽毛球锦标赛。", "ms": "Sekolah kami memenangi kejohanan badminton itu." } },
            { "word": "played", "hint": "The Past Simple of verb 'play'", "translations": { "cn": "玩耍", "ms": "bermain" }, "sentences": { "en": "We played congkak in the afternoon.", "cn": "我们在下午玩了马来播棋。", "ms": "Kami bermain congkak pada waktu petang." } },
            { "word": "visited", "hint": "The Past Simple of verb 'visit'", "translations": { "cn": "拜访/参观", "ms": "melawat" }, "sentences": { "en": "They visited the twin towers yesterday.", "cn": "他们昨天参观了双峰塔。", "ms": "Mereka melawat menara berkembar semalam." } },
            { "word": "climbed", "hint": "The Past Simple of verb 'climb'", "translations": { "cn": "攀登", "ms": "memanjat/" }, "sentences": { "en": "My brother climbed Mount Kinabalu.", "cn": "我哥哥爬了神山。", "ms": "Abang saya mendaki Gunung Kinabalu." } },
            { "word": "helped", "hint": "The Past Simple of verb 'help'", "translations": { "cn": "帮忙", "ms": "membantu" }, "sentences": { "en": "I helped my mother cook rendang.", "cn": "我帮妈妈煮了仁当。", "ms": "Saya membantu ibu memasak rendang." } },
            { "word": "washed", "hint": "The Past Simple of verb 'wash'", "translations": { "cn": "清洗", "ms": "mencuci" }, "sentences": { "en": "They washed their hands before eating.", "cn": "他们饭前洗了手。", "ms": "Mereka mencuci tangan sebelum makan." } },
            { "word": "walked", "hint": "The Past Simple of verb 'walk'", "translations": { "cn": "走", "ms": "berjalan" }, "sentences": { "en": "We walked around the botanical garden.", "cn": "我们在植物园里散步。", "ms": "Kami berjalan di sekitar taman botani." } },
            { "word": "watched", "hint": "The Past Simple of verb 'watch'", "translations": { "cn": "观看", "ms": "menonton" }, "sentences": { "en": "I watched the parade on television.", "cn": "我在电视上观看了游行。", "ms": "Saya menonton perarakan itu di televisyen." } },
            { "word": "cooked", "hint": "The Past Simple of verb 'cook'", "translations": { "cn": "烹饪", "ms": "memasak" }, "sentences": { "en": "Grandmother cooked curry laksa.", "cn": "奶奶煮了咖喱叻沙。", "ms": "Nenek memasak laksa kari." } },
            { "word": "listened", "hint": "The Past Simple of verb 'listen'", "translations": { "cn": "听", "ms": "mendengar" }, "sentences": { "en": "We listened to traditional music.", "cn": "我们听了传统音乐。", "ms": "Kami mendengar muzik tradisional." } },
            { "word": "studied", "hint": "The Past Simple of verb 'study'", "translations": { "cn": "学习", "ms": "belajar" }, "sentences": { "en": "He studied hard for the exam.", "cn": "他为考试努力学习。", "ms": "Dia belajar bersungguh-sungguh untuk peperiksaan." } },
            { "word": "created", "hint": "The Past Simple of verb 'create'", "translations": { "cn": "创造", "ms": "mencipta" }, "sentences": { "en": "The artist created a beautiful mural.", "cn": "艺术家创作了一幅美丽的壁画。", "ms": "Artis itu mencipta mural yang cantik." } },
            { "word": "danced", "hint": "The Past Simple of verb 'dance'", "translations": { "cn": "跳舞", "ms": "menari" }, "sentences": { "en": "They danced the joget at the festival.", "cn": "他们在节日上跳了交际舞。", "ms": "Mereka menari joget di pesta itu." } },
            {
                "word": "jumped",
                "hint": "The Past Simple of verb 'jump'",
                "translations": {
                    "cn": "跳",
                    "ms": "melompat"
                },
                "sentences": {
                    "en": "I jumped over the puddle.",
                    "cn": "我跳过了那个水坑。",
                    "ms": "Saya melompat melepasi lopak air itu."
                }
            },
            {
                "word": "hopped",
                "hint": "The Past Simple of verb 'hop'",
                "translations": {
                    "cn": "单脚跳",
                    "ms": "melompat-lompat"
                },
                "sentences": {
                    "en": "The rabbit hopped away.",
                    "cn": "兔子跳着离开了。",
                    "ms": "Arnab itu melompat-lompat pergi."
                }
            },
            {
                "word": "skipped",
                "hint": "The Past Simple of verb 'skip'",
                "translations": {
                    "cn": "跳跃",
                    "ms": "berskip"
                },
                "sentences": {
                    "en": "She skipped down the street.",
                    "cn": "她蹦蹦跳跳地走在街上。",
                    "ms": "Dia berskip di sepanjang jalan."
                }
            },
            {
                "word": "rode",
                "hint": "The Past Simple of verb 'ride'",
                "translations": {
                    "cn": "骑",
                    "ms": "menunggang"
                },
                "sentences": {
                    "en": "We rode our bikes to the park.",
                    "cn": "我们骑脚车去公园。",
                    "ms": "Kami menunggang basikal ke taman."
                }
            },
            {
                "word": "threw",
                "hint": "The Past Simple of verb 'throw'",
                "translations": {
                    "cn": "扔",
                    "ms": "membaling"
                },
                "sentences": {
                    "en": "He threw the ball to me.",
                    "cn": "他把球扔给了我。",
                    "ms": "Dia membaling bola itu kepada saya."
                }
            },
            {
                "word": "sang",
                "hint": "The Past Simple of verb 'sing'",
                "translations": {
                    "cn": "唱歌",
                    "ms": "menyanyi"
                },
                "sentences": {
                    "en": "We sang a song in class.",
                    "cn": "我们在班上唱了一首歌。",
                    "ms": "Kami menyanyi sebuah lagu di dalam kelas."
                }
            },
            {
                "word": "drew",
                "hint": "The Past Simple of verb 'draw'",
                "translations": {
                    "cn": "画",
                    "ms": "melukis"
                },
                "sentences": {
                    "en": "I drew a picture of a cat.",
                    "cn": "我画了一只猫的图画。",
                    "ms": "Saya melukis sekeping gambar kucing."
                }
            },
            {
                "word": "spelled",
                "hint": "The Past Simple of verb 'spell'",
                "translations": {
                    "cn": "拼写",
                    "ms": "mengeja"
                },
                "sentences": {
                    "en": "She spelled her name correctly.",
                    "cn": "她正确地拼写了她的名字。",
                    "ms": "Dia mengeja namanya dengan betul."
                }
            },
            {
                "word": "talked",
                "hint": "The Past Simple of verb 'talk'",
                "translations": {
                    "cn": "说话",
                    "ms": "bercakap"
                },
                "sentences": {
                    "en": "We talked about the movie.",
                    "cn": "我们谈论了那部电影。",
                    "ms": "Kami bercakap tentang filem itu."
                }
            },
            {
                "word": "looked",
                "hint": "The Past Simple of verb 'look'",
                "translations": {
                    "cn": "看",
                    "ms": "melihat"
                },
                "sentences": {
                    "en": "I looked out the window.",
                    "cn": "我看着窗外。",
                    "ms": "Saya melihat ke luar tingkap."
                }
            },
            {
                "word": "heard",
                "hint": "The Past Simple of verb 'hear'",
                "translations": {
                    "cn": "听见",
                    "ms": "mendengar"
                },
                "sentences": {
                    "en": "I heard a loud noise.",
                    "cn": "我听到了一声巨响。",
                    "ms": "Saya mendengar bunyi bising yang kuat."
                }
            },
            {
                "word": "felt",
                "hint": "The Past Simple of verb 'feel'",
                "translations": {
                    "cn": "感觉",
                    "ms": "berasa"
                },
                "sentences": {
                    "en": "She felt happy after the test.",
                    "cn": "考试后她感到很开心。",
                    "ms": "Dia berasa gembira selepas ujian itu."
                }
            },
            {
                "word": "tasted",
                "hint": "The Past Simple of verb 'taste'",
                "translations": {
                    "cn": "品尝",
                    "ms": "merasa"
                },
                "sentences": {
                    "en": "The soup tasted very salty.",
                    "cn": "这汤尝起来很咸。",
                    "ms": "Sup itu berasa sangat masin."
                }
            },
            {
                "word": "touched",
                "hint": "The Past Simple of verb 'touch'",
                "translations": {
                    "cn": "触摸",
                    "ms": "menyentuh"
                },
                "sentences": {
                    "en": "I touched the cold ice.",
                    "cn": "我摸了摸冰冷的冰块。",
                    "ms": "Saya menyentuh ais yang sejuk itu."
                }
            },
            {
                "word": "smelled",
                "hint": "The Past Simple of verb 'smell'",
                "translations": {
                    "cn": "闻",
                    "ms": "berbau/menghidu"
                },
                "sentences": {
                    "en": "The flower smelled nice.",
                    "cn": "这朵花闻起来很香。",
                    "ms": "Bunga itu berbau harum."
                }
            },
            {
                "word": "brushed",
                "hint": "The Past Simple of verb 'brush'",
                "translations": {
                    "cn": "刷",
                    "ms": "memberus"
                },
                "sentences": {
                    "en": "I brushed my teeth this morning.",
                    "cn": "我今天早上刷牙了。",
                    "ms": "Saya memberus gigi saya pagi ini."
                }
            },
            {
                "word": "combed",
                "hint": "The Past Simple of verb 'comb'",
                "translations": {
                    "cn": "梳",
                    "ms": "menyikat"
                },
                "sentences": {
                    "en": "He combed his hair neatly.",
                    "cn": "他把头发梳得很整齐。",
                    "ms": "Dia menyikat rambutnya dengan kemas."
                }
            },
            {
                "word": "dressed",
                "hint": "The Past Simple of verb 'dress'",
                "translations": {
                    "cn": "穿衣",
                    "ms": "berpakaian"
                },
                "sentences": {
                    "en": "I dressed quickly for school.",
                    "cn": "我快速地穿好衣服去上学。",
                    "ms": "Saya berpakaian dengan cepat untuk ke sekolah."
                }
            },
            {
                "word": "packed",
                "hint": "The Past Simple of verb 'pack'",
                "translations": {
                    "cn": "打包",
                    "ms": "membungkus"
                },
                "sentences": {
                    "en": "We packed our bags for the trip.",
                    "cn": "我们为旅行打包了行李。",
                    "ms": "Kami membungkus beg kami untuk percutian itu."
                }
            },
            {
                "word": "came",
                "hint": "The Past Simple of verb 'come'",
                "translations": {
                    "cn": "来",
                    "ms": "datang"
                },
                "sentences": {
                    "en": "My friend came to my house.",
                    "cn": "我的朋友来到了我家。",
                    "ms": "Kawan saya datang ke rumah saya."
                }
            },
            {
                "word": "sat",
                "hint": "The Past Simple of verb 'sit'",
                "translations": {
                    "cn": "坐",
                    "ms": "duduk"
                },
                "sentences": {
                    "en": "We sat on the grass.",
                    "cn": "我们坐在草地上。",
                    "ms": "Kami duduk di atas rumput."
                }
            },
            {
                "word": "pointed",
                "hint": "The Past Simple of verb 'point'",
                "translations": {
                    "cn": "指",
                    "ms": "menunjuk"
                },
                "sentences": {
                    "en": "The teacher pointed at the map.",
                    "cn": "老师指着地图。",
                    "ms": "Cikgu menunjuk ke arah peta itu."
                }
            },
            {
                "word": "opened",
                "hint": "The Past Simple of verb 'open'",
                "translations": {
                    "cn": "打开",
                    "ms": "membuka"
                },
                "sentences": {
                    "en": "I opened the door for him.",
                    "cn": "我为他打开了门。",
                    "ms": "Saya membuka pintu untuknya."
                }
            },
            {
                "word": "closed",
                "hint": "The Past Simple of verb 'close'",
                "translations": {
                    "cn": "关闭",
                    "ms": "menutup"
                },
                "sentences": {
                    "en": "He closed the window.",
                    "cn": "他关上了窗户。",
                    "ms": "Dia menutup tingkap itu."
                }
            },
            {
                "word": "turned",
                "hint": "The Past Simple of verb 'turn'",
                "translations": {
                    "cn": "转",
                    "ms": "memusing"
                },
                "sentences": {
                    "en": "She turned around to look.",
                    "cn": "她转过身来看。",
                    "ms": "Dia memusing ke belakang untuk melihat."
                }
            },
            {
                "word": "stopped",
                "hint": "The Past Simple of verb 'stop'",
                "translations": {
                    "cn": "停止",
                    "ms": "berhenti"
                },
                "sentences": {
                    "en": "The car stopped at the red light.",
                    "cn": "汽车在红绿灯前停了下来。",
                    "ms": "Kereta itu berhenti di lampu merah."
                }
            },
            {
                "word": "started",
                "hint": "The Past Simple of verb 'start'",
                "translations": {
                    "cn": "开始",
                    "ms": "bermula"
                },
                "sentences": {
                    "en": "The race started at 8 AM.",
                    "cn": "比赛在早上八点开始了。",
                    "ms": "Perlumbaan itu bermula pada pukul lapan pagi."
                }
            },
            {
                "word": "liked",
                "hint": "The Past Simple of verb 'like'",
                "translations": {
                    "cn": "喜欢",
                    "ms": "menyukai"
                },
                "sentences": {
                    "en": "I liked the chocolate cake.",
                    "cn": "我喜欢那个巧克力蛋糕。",
                    "ms": "Saya menyukai kek coklat itu."
                }
            },
            {
                "word": "loved",
                "hint": "The Past Simple of verb 'love'",
                "translations": {
                    "cn": "爱",
                    "ms": "menyayangi"
                },
                "sentences": {
                    "en": "They loved the trip to the zoo.",
                    "cn": "他们非常喜欢去动物园的旅行。",
                    "ms": "Mereka sangat menyukai lawatan ke zoo itu."
                }
            },
            {
                "word": "hated",
                "hint": "The Past Simple of verb 'hate'",
                "translations": {
                    "cn": "讨厌",
                    "ms": "membenci"
                },
                "sentences": {
                    "en": "He hated doing the chores.",
                    "cn": "他讨厌做家务。",
                    "ms": "Dia membenci melakukan kerja rumah."
                }
            },
            {
                "word": "wanted",
                "hint": "The Past Simple of verb 'want'",
                "translations": {
                    "cn": "想要",
                    "ms": "mahu"
                },
                "sentences": {
                    "en": "I wanted an apple.",
                    "cn": "我想要一粒苹果。",
                    "ms": "Saya mahu sebiji epal."
                }
            },
            {
                "word": "needed",
                "hint": "The Past Simple of verb 'need'",
                "translations": {
                    "cn": "需要",
                    "ms": "memerlukan"
                },
                "sentences": {
                    "en": "We needed more time.",
                    "cn": "我们需要更多时间。",
                    "ms": "Kami memerlukan lebih banyak masa."
                }
            },
            {
                "word": "had",
                "hint": "The Past Simple of verb 'have'",
                "translations": {
                    "cn": "有",
                    "ms": "mempunyai"
                },
                "sentences": {
                    "en": "I had a great time.",
                    "cn": "我度过了一段美好的时光。",
                    "ms": "Saya mempunyai masa yang sangat menyeronokkan."
                }
            },
            {
                "word": "did",
                "hint": "The Past Simple of verb 'do'",
                "translations": {
                    "cn": "做",
                    "ms": "membuat"
                },
                "sentences": {
                    "en": "She did her homework yesterday.",
                    "cn": "她昨天做了功课。",
                    "ms": "Dia membuat kerja rumahnya semalam."
                }
            },
            {
                "word": "cleaned",
                "hint": "The Past Simple of verb 'clean'",
                "translations": {
                    "cn": "清理",
                    "ms": "membersihkan"
                },
                "sentences": {
                    "en": "We cleaned the classroom.",
                    "cn": "我们打扫了课室。",
                    "ms": "Kami membersihkan bilik darjah."
                }
            },
            {
                "word": "tidied",
                "hint": "The Past Simple of verb 'tidy'",
                "translations": {
                    "cn": "整理",
                    "ms": "mengemas"
                },
                "sentences": {
                    "en": "I tidied my bedroom.",
                    "cn": "我整理了我的卧室。",
                    "ms": "Saya mengemas bilik tidur saya."
                }
            },
            {
                "word": "swept",
                "hint": "The Past Simple of verb 'sweep'",
                "translations": {
                    "cn": "扫",
                    "ms": "menyapu"
                },
                "sentences": {
                    "en": "She swept the floor.",
                    "cn": "她扫了地。",
                    "ms": "Dia menyapu lantai."
                }
            },
            {
                "word": "mopped",
                "hint": "The Past Simple of verb 'mop'",
                "translations": {
                    "cn": "拖地",
                    "ms": "mengemop"
                },
                "sentences": {
                    "en": "The janitor mopped the hallway.",
                    "cn": "清洁工拖了走廊的地。",
                    "ms": "Tukang cuci itu mengemop koridor."
                }
            },
            {
                "word": "wiped",
                "hint": "The Past Simple of verb 'wipe'",
                "translations": {
                    "cn": "擦",
                    "ms": "mengelap"
                },
                "sentences": {
                    "en": "I wiped the table clean.",
                    "cn": "我把桌子擦干净了。",
                    "ms": "Saya mengelap meja itu sehingga bersih."
                }
            },
            {
                "word": "put",
                "hint": "The Past Simple of verb 'put'",
                "translations": {
                    "cn": "放",
                    "ms": "meletakkan"
                },
                "sentences": {
                    "en": "She put the book on the desk.",
                    "cn": "她把书放在书桌上。",
                    "ms": "Dia meletakkan buku itu di atas meja."
                }
            },
            {
                "word": "pulled",
                "hint": "The Past Simple of verb 'pull'",
                "translations": {
                    "cn": "拉",
                    "ms": "menarik"
                },
                "sentences": {
                    "en": "He pulled the heavy box.",
                    "cn": "他拉动了那个重箱子。",
                    "ms": "Dia menarik kotak yang berat itu."
                }
            },
            {
                "word": "pushed",
                "hint": "The Past Simple of verb 'push'",
                "translations": {
                    "cn": "推",
                    "ms": "menolak"
                },
                "sentences": {
                    "en": "We pushed the car to start it.",
                    "cn": "我们推车来启动它。",
                    "ms": "Kami menolak kereta itu untuk menghidupkannya."
                }
            },
            {
                "word": "carried",
                "hint": "The Past Simple of verb 'carry'",
                "translations": {
                    "cn": "携带",
                    "ms": "membawa"
                },
                "sentences": {
                    "en": "I carried the bags for my mother.",
                    "cn": "我帮妈妈提了那些袋子。",
                    "ms": "Saya membawa beg-beg itu untuk ibu saya."
                }
            },
            {
                "word": "held",
                "hint": "The Past Simple of verb 'hold'",
                "translations": {
                    "cn": "拿着",
                    "ms": "memegang"
                },
                "sentences": {
                    "en": "She held my hand tightly.",
                    "cn": "她紧紧地握住我的手。",
                    "ms": "Dia memegang tangan saya dengan erat."
                }
            },
            {
                "word": "lost",
                "hint": "The Past Simple of verb 'lose'",
                "translations": {
                    "cn": "丢失",
                    "ms": "hilang"
                },
                "sentences": {
                    "en": "I lost my pencil case.",
                    "cn": "我弄丢了我的铅笔盒。",
                    "ms": "Saya telah menghilangkan bekas pensel saya."
                }
            },
            {
                "word": "dropped",
                "hint": "The Past Simple of verb 'drop'",
                "translations": {
                    "cn": "掉落",
                    "ms": "menjatuhkan"
                },
                "sentences": {
                    "en": "He dropped the glass.",
                    "cn": "他把玻璃杯掉在了地上。",
                    "ms": "Dia menjatuhkan gelas itu."
                }
            },
            {
                "word": "broke",
                "hint": "The Past Simple of verb 'break'",
                "translations": {
                    "cn": "打破",
                    "ms": "memecahkan"
                },
                "sentences": {
                    "en": "She broke the vase by mistake.",
                    "cn": "她不小心打破了花瓶。",
                    "ms": "Dia memecahkan pasu itu secara tidak sengaja."
                }
            },
            {
                "word": "fixed",
                "hint": "The Past Simple of verb 'fix'",
                "translations": {
                    "cn": "修理",
                    "ms": "membaiki"
                },
                "sentences": {
                    "en": "My dad fixed my bicycle.",
                    "cn": "爸爸修理了我的脚车。",
                    "ms": "Ayah saya membaiki basikal saya."
                }
            },
            {
                "word": "cut",
                "hint": "The Past Simple of verb 'cut'",
                "translations": {
                    "cn": "切",
                    "ms": "memotong"
                },
                "sentences": {
                    "en": "I cut the paper with scissors.",
                    "cn": "我用剪刀剪纸。",
                    "ms": "Saya memotong kertas itu menggunakan gunting."
                }
            },
            {
                "word": "used",
                "hint": "The Past Simple of verb 'use'",
                "translations": {
                    "cn": "使用",
                    "ms": "menggunakan"
                },
                "sentences": {
                    "en": "We used the computer in class.",
                    "cn": "我们在班上使用了电脑。",
                    "ms": "Kami menggunakan komputer di dalam kelas."
                }
            },
            {
                "word": "wore",
                "hint": "The Past Simple of verb 'wear'",
                "translations": {
                    "cn": "穿",
                    "ms": "memakai"
                },
                "sentences": {
                    "en": "He wore a blue shirt yesterday.",
                    "cn": "他昨天穿了一件蓝色的衬衫。",
                    "ms": "Dia memakai kemeja biru semalam."
                }
            },
            {
                "word": "sold",
                "hint": "The Past Simple of verb 'sell'",
                "translations": {
                    "cn": "卖",
                    "ms": "menjual"
                },
                "sentences": {
                    "en": "The shop sold out of bread.",
                    "cn": "那家店的面包卖光了。",
                    "ms": "Kedai itu telah habis menjual roti."
                }
            },
            {
                "word": "paid",
                "hint": "The Past Simple of verb 'pay'",
                "translations": {
                    "cn": "付钱",
                    "ms": "membayar"
                },
                "sentences": {
                    "en": "I paid for the tickets.",
                    "cn": "我付了那些票的钱。",
                    "ms": "Saya membayar untuk tiket-tiket itu."
                }
            },
            {
                "word": "cost",
                "hint": "The Past Simple of verb 'cost'",
                "translations": {
                    "cn": "花费",
                    "ms": "berharga"
                },
                "sentences": {
                    "en": "The toy cost ten ringgit.",
                    "cn": "这个玩具价值十令吉。",
                    "ms": "Mainan itu berharga sepuluh ringgit."
                }
            },
            {
                "word": "worked",
                "hint": "The Past Simple of verb 'work'",
                "translations": {
                    "cn": "工作",
                    "ms": "bekerja"
                },
                "sentences": {
                    "en": "My uncle worked late yesterday.",
                    "cn": "我叔叔昨天工作到很晚。",
                    "ms": "Bapa saudara saya bekerja lewat semalam."
                }
            },
            {
                "word": "built",
                "hint": "The Past Simple of verb 'build'",
                "translations": {
                    "cn": "建造",
                    "ms": "membina"
                },
                "sentences": {
                    "en": "They built a sandcastle on the beach.",
                    "cn": "他们在沙滩上建了一个沙堡。",
                    "ms": "Mereka membina istana pasir di pantai."
                }
            },
            {
                "word": "grew",
                "hint": "The Past Simple of verb 'grow'",
                "translations": {
                    "cn": "生长",
                    "ms": "tumbuh"
                },
                "sentences": {
                    "en": "The plant grew very fast.",
                    "cn": "这棵植物长得非常快。",
                    "ms": "Pokok itu tumbuh dengan sangat cepat."
                }
            },
            {
                "word": "planted",
                "hint": "The Past Simple of verb 'plant'",
                "translations": {
                    "cn": "种植",
                    "ms": "menanam"
                },
                "sentences": {
                    "en": "We planted a tree in the yard.",
                    "cn": "我们在院子里种了一棵树。",
                    "ms": "Kami menanam sebatang pokok di halaman."
                }
            },
            {
                "word": "picked",
                "hint": "The Past Simple of verb 'pick'",
                "translations": {
                    "cn": "挑选/摘",
                    "ms": "memetik"
                },
                "sentences": {
                    "en": "I picked the red apple.",
                    "cn": "我摘了那个红苹果。",
                    "ms": "Saya memetik epal merah itu."
                }
            },
            {
                "word": "fed",
                "hint": "The Past Simple of verb 'feed'",
                "translations": {
                    "cn": "喂",
                    "ms": "memberi makan"
                },
                "sentences": {
                    "en": "She fed the stray cat.",
                    "cn": "她喂了那只流浪猫。",
                    "ms": "Dia memberi makan kucing jalanan itu."
                }
            },
            {
                "word": "kicked",
                "hint": "The Past Simple of verb 'kick'",
                "translations": {
                    "cn": "踢",
                    "ms": "menendang"
                },
                "sentences": {
                    "en": "He kicked the ball hard.",
                    "cn": "他用力地踢了球。",
                    "ms": "Dia menendang bola itu dengan kuat."
                }
            },
            {
                "word": "bounced",
                "hint": "The Past Simple of verb 'bounce'",
                "translations": {
                    "cn": "弹",
                    "ms": "melantun"
                },
                "sentences": {
                    "en": "The ball bounced high.",
                    "cn": "球弹得很高。",
                    "ms": "Bola itu melantun tinggi."
                }
            },
            {
                "word": "hit",
                "hint": "The Past Simple of verb 'hit'",
                "translations": {
                    "cn": "打",
                    "ms": "memukul"
                },
                "sentences": {
                    "en": "He hit the ball with the bat.",
                    "cn": "他用球棒击打了那个球。",
                    "ms": "Dia memukul bola itu dengan kayu pemukul."
                }
            },
            {
                "word": "scored",
                "hint": "The Past Simple of verb 'score'",
                "translations": {
                    "cn": "得分",
                    "ms": "menjaringkan"
                },
                "sentences": {
                    "en": "Ali scored a goal for his team.",
                    "cn": "阿里为他的球队进了一球。",
                    "ms": "Ali menjaringkan gol untuk pasukannya."
                }
            },
            {
                "word": "tried",
                "hint": "The Past Simple of verb 'try'",
                "translations": {
                    "cn": "尝试",
                    "ms": "mencuba"
                },
                "sentences": {
                    "en": "I tried traditional food.",
                    "cn": "我尝试了传统食物。",
                    "ms": "Saya mencuba makanan tradisional."
                }
            },
            {
                "word": "guessed",
                "hint": "The Past Simple of verb 'guess'",
                "translations": {
                    "cn": "猜测",
                    "ms": "meneka"
                },
                "sentences": {
                    "en": "She guessed the correct answer.",
                    "cn": "她猜对了正确的答案。",
                    "ms": "Dia meneka jawapan yang betul."
                }
            },
            {
                "word": "matched",
                "hint": "The Past Simple of verb 'match'",
                "translations": {
                    "cn": "匹配",
                    "ms": "memadankan"
                },
                "sentences": {
                    "en": "He matched the cards correctly.",
                    "cn": "他正确地配对了卡片。",
                    "ms": "Dia memadankan kad-kad itu dengan betul."
                }
            },
            {
                "word": "counted",
                "hint": "The Past Simple of verb 'count'",
                "translations": {
                    "cn": "数",
                    "ms": "mengira"
                },
                "sentences": {
                    "en": "I counted the coins in my pocket.",
                    "cn": "我数了口袋里的硬币。",
                    "ms": "Saya mengira syiling di dalam poket saya."
                }
            }
        ],
        "Present Continuous": [
            { "word": "going", "hint": "The Present Continuous of verb 'go'", "translations": { "cn": "去", "ms": "pergi" }, "sentences": { "en": "Ali is going to the night market.", "cn": "阿里正在去夜市。", "ms": "Ali sedang pergi ke pasar malam." } },
            { "word": "eating", "hint": "The Present Continuous of verb 'eat'", "translations": { "cn": "吃", "ms": "makan" }, "sentences": { "en": "I am eating a delicious nasi lemak.", "cn": "我正在吃美味的椰浆饭。", "ms": "Saya sedang makan nasi lemak yang sedap." } },
            { "word": "seeing", "hint": "The Present Continuous of verb 'see'", "translations": { "cn": "看见", "ms": "melihat/nampak" }, "sentences": { "en": "His parents are seeing a tapir right now.", "cn": "他的父母现在正看着马来貘。", "ms": "Ibu bapanya sedang melihat seekor tapir sekarang." } },
            { "word": "buying", "hint": "The Present Continuous of verb 'buy'", "translations": { "cn": "买", "ms": "membeli" }, "sentences": { "en": "She is buying some batik from Terengganu.", "cn": "她正在买来自登嘉楼的巴迪布。", "ms": "Dia sedang membeli kain batik dari Terengganu." } },
            { "word": "bringing", "hint": "The Present Continuous of verb 'bring'", "translations": { "cn": "带来", "ms": "membawa" }, "sentences": { "en": "He is bringing durians to the kampung.", "cn": "他正把榴莲带到甘榜。", "ms": "Dia sedang membawa durian ke kampung." } },
            { "word": "drinking", "hint": "The Present Continuous of verb 'drink'", "translations": { "cn": "喝", "ms": "minum" }, "sentences": { "en": "I am drinking a cold teh tarik.", "cn": "我正在喝冷拉茶。", "ms": "Saya sedang minum teh tarik sejuk." } },
            { "word": "catching", "hint": "The Present Continuous of verb 'catch'", "translations": { "cn": "抓", "ms": "menangkap" }, "sentences": { "en": "My father is catching a large fish.", "cn": "我父亲正在捉一条大鱼。", "ms": "Bapa saya sedang menangkap ikan besar." } },
            { "word": "making", "hint": "The Present Continuous of verb 'make'", "translations": { "cn": "制作/做", "ms": "membuat" }, "sentences": { "en": "Mother is making traditional kuih.", "cn": "妈妈正在做传统糕点。", "ms": "Ibu sedang membuat kuih tradisional." } },
            { "word": "taking", "hint": "The Present Continuous of verb 'take'", "translations": { "cn": "拿/乘坐", "ms": "mengambil/menaiki" }, "sentences": { "en": "They are taking the LRT to KLCC.", "cn": "他们正在乘坐轻快铁去吉隆坡城中城。", "ms": "Mereka sedang menaiki LRT ke KLCC." } },
            { "word": "giving", "hint": "The Present Continuous of verb 'give'", "translations": { "cn": "给", "ms": "memberi" }, "sentences": { "en": "Grandparents are giving us 'duit raya'.", "cn": "祖父母正在给我们‘青包’。", "ms": "Datuk dan nenek sedang memberi kami duit raya." } },
            { "word": "flying", "hint": "The Present Continuous of verb 'fly'", "translations": { "cn": "飞/放飞", "ms": "terbang/menerbangkan" }, "sentences": { "en": "We are flying a wau in the field.", "cn": "我们正在田野里放风筝。", "ms": "Kami sedang menerbangkan wau di padang." } },
            { "word": "running", "hint": "The Present Continuous of verb 'run'", "translations": { "cn": "跑", "ms": "berlari" }, "sentences": { "en": "The boy is running to catch the bus.", "cn": "男孩正在跑着去赶巴士。", "ms": "Budak lelaki itu sedang berlari untuk mengejar bas." } },
            { "word": "sleeping", "hint": "The Present Continuous of verb 'sleep'", "translations": { "cn": "睡觉", "ms": "tidur" }, "sentences": { "en": "The cat is sleeping quietly.", "cn": "猫正在安静地睡觉。", "ms": "Kucing itu sedang tidur dengan senyap." } },
            { "word": "swimming", "hint": "The Present Continuous of verb 'swim'", "translations": { "cn": "游泳", "ms": "berenang" }, "sentences": { "en": "We are swimming in the clear water.", "cn": "我们正在清澈的水里游泳。", "ms": "Kami sedang berenang di air yang jernih." } },
            { "word": "waking", "hint": "The Present Continuous of verb 'wake'", "translations": { "cn": "醒来", "ms": "bangun" }, "sentences": { "en": "He is waking up early today.", "cn": "他今天起得很早。", "ms": "Dia sedang bangun awal hari ini." } },
            { "word": "writing", "hint": "The Present Continuous of verb 'write'", "translations": { "cn": "写", "ms": "menulis" }, "sentences": { "en": "He is writing a letter to his pen pal.", "cn": "他正在给笔友写信。", "ms": "Dia sedang menulis surat kepada sahabat penanya." } },
            { "word": "reading", "hint": "The Present Continuous of verb 'read'", "translations": { "cn": "阅读", "ms": "membaca" }, "sentences": { "en": "She is reading a story about Hang Tuah.", "cn": "她正在读汉都亚的故事。", "ms": "Dia sedang membaca cerita tentang Hang Tuah." } },
            { "word": "speaking", "hint": "The Present Continuous of verb 'speak'", "translations": { "cn": "说话", "ms": "bercakap" }, "sentences": { "en": "The teacher is speaking nicely.", "cn": "老师正在和蔼地讲话。", "ms": "Guru sedang bercakap dengan baik." } },
            { "word": "standing", "hint": "The Present Continuous of verb 'stand'", "translations": { "cn": "站立", "ms": "berdiri" }, "sentences": { "en": "Everyone is standing to sing the anthem.", "cn": "大家正站着唱国歌。", "ms": "Semua orang sedang berdiri untuk menyanyikan lagu kebangsaan." } },
            { "word": "winning", "hint": "The Present Continuous of verb 'win'", "translations": { "cn": "赢", "ms": "menang" }, "sentences": { "en": "Our school is winning the tournament.", "cn": "我们学校正在赢得锦标赛。", "ms": "Sekolah kami sedang memenangi kejohanan itu." } },
            { "word": "playing", "hint": "The Present Continuous of verb 'play'", "translations": { "cn": "玩耍", "ms": "bermain" }, "sentences": { "en": "We are playing congkak.", "cn": "我们正在玩马来播棋。", "ms": "Kami sedang bermain congkak." } },
            { "word": "visiting", "hint": "The Present Continuous of verb 'visit'", "translations": { "cn": "拜访/参观", "ms": "melawat" }, "sentences": { "en": "They are visiting the twin towers.", "cn": "他们正在参观双子塔。", "ms": "Mereka sedang melawat menara berkembar." } },
            { "word": "climbing", "hint": "The Present Continuous of verb 'climb'", "translations": { "cn": "攀登", "ms": "mendaki" }, "sentences": { "en": "My brother is climbing Mount Kinabalu.", "cn": "我哥哥正在爬神山。", "ms": "Abang saya sedang mendaki Gunung Kinabalu." } },
            { "word": "helping", "hint": "The Present Continuous of verb 'help'", "translations": { "cn": "帮忙", "ms": "membantu" }, "sentences": { "en": "I am helping my mother cook rendang.", "cn": "我正在帮妈妈做仁当。", "ms": "Saya sedang membantu ibu memasak rendang." } },
            { "word": "washing", "hint": "The Present Continuous of verb 'wash'", "translations": { "cn": "清洗", "ms": "mencuci" }, "sentences": { "en": "They are washing their hands.", "cn": "他们正在洗手。", "ms": "Mereka sedang mencuci tangan." } },
            { "word": "walking", "hint": "The Present Continuous of verb 'walk'", "translations": { "cn": "走", "ms": "berjalan" }, "sentences": { "en": "We are walking around the garden.", "cn": "我们正在花园里散步。", "ms": "Kami sedang berjalan di persekitaran taman." } },
            { "word": "watching", "hint": "The Present Continuous of verb 'watch'", "translations": { "cn": "观看", "ms": "menonton" }, "sentences": { "en": "I am watching the parade on television.", "cn": "我正在电视上看游行。", "ms": "Saya sedang menonton perarakan di televisyen." } },
            { "word": "cooking", "hint": "The Present Continuous of verb 'cook'", "translations": { "cn": "烹饪", "ms": "memasak" }, "sentences": { "en": "Grandmother is cooking curry laksa.", "cn": "奶奶正在煮咖喱叻沙。", "ms": "Nenek sedang memasak laksa kari." } },
            { "word": "listening", "hint": "The Present Continuous of verb 'listen'", "translations": { "cn": "听", "ms": "mendengar" }, "sentences": { "en": "We are listening to traditional music.", "cn": "我们正在听传统音乐。", "ms": "Kami sedang mendengar muzik tradisional." } },
            { "word": "studying", "hint": "The Present Continuous of verb 'study'", "translations": { "cn": "学习", "ms": "belajar" }, "sentences": { "en": "He is studying hard for the exam.", "cn": "他正在为考试努力学习。", "ms": "Dia sedang belajar bersungguh-sungguh untuk peperiksaan." } },
            { "word": "creating", "hint": "The Present Continuous of verb 'create'", "translations": { "cn": "创造", "ms": "mencipta" }, "sentences": { "en": "The artist is creating a beautiful mural.", "cn": "艺术家正在创作一幅美丽的壁画。", "ms": "Artis sedang mencipta mural yang cantik." } },
            { "word": "dancing", "hint": "The Present Continuous of verb 'dance'", "translations": { "cn": "跳舞", "ms": "menari" }, "sentences": { "en": "They are dancing the joget at the festival.", "cn": "他们正在节日上跳交际舞。", "ms": "Mereka sedang menari joget di pesta itu." } }
            ,
            {
                "word": "jumping",
                "hint": "The Present Continuous of verb 'jump'",
                "translations": {
                    "cn": "跳",
                    "ms": "melompat"
                },
                "sentences": {
                    "en": "The boy is jumping on the bed.",
                    "cn": "男孩正在床上跳跃。",
                    "ms": "Budak lelaki itu sedang melompat di atas katil."
                }
            },
            {
                "word": "hopping",
                "hint": "The Present Continuous of verb 'hop'",
                "translations": {
                    "cn": "单脚跳",
                    "ms": "melompat-lompat"
                },
                "sentences": {
                    "en": "The frog is hopping in the pond.",
                    "cn": "青蛙正在池塘里跳来跳去。",
                    "ms": "Katak itu sedang melompat-lompat di dalam kolam."
                }
            },
            {
                "word": "skipping",
                "hint": "The Present Continuous of verb 'skip'",
                "translations": {
                    "cn": "跳跃",
                    "ms": "berskip"
                },
                "sentences": {
                    "en": "They are skipping with a rope.",
                    "cn": "他们正在跳绳。",
                    "ms": "Mereka sedang berskip menggunakan tali."
                }
            },
            {
                "word": "riding",
                "hint": "The Present Continuous of verb 'ride'",
                "translations": {
                    "cn": "骑",
                    "ms": "menunggang"
                },
                "sentences": {
                    "en": "He is riding a horse.",
                    "cn": "他正在骑马。",
                    "ms": "Dia sedang menunggang seekor kuda."
                }
            },
            {
                "word": "throwing",
                "hint": "The Present Continuous of verb 'throw'",
                "translations": {
                    "cn": "扔",
                    "ms": "membaling"
                },
                "sentences": {
                    "en": "She is throwing the rubbish.",
                    "cn": "她正在丢垃圾。",
                    "ms": "Dia sedang membuang sampah."
                }
            },
            {
                "word": "singing",
                "hint": "The Present Continuous of verb 'sing'",
                "translations": {
                    "cn": "唱歌",
                    "ms": "menyanyi"
                },
                "sentences": {
                    "en": "The bird is singing a sweet melody.",
                    "cn": "鸟儿正在唱着甜美的旋律。",
                    "ms": "Burung itu sedang menyanyi melodi yang merdu."
                }
            },
            {
                "word": "drawing",
                "hint": "The Present Continuous of verb 'draw'",
                "translations": {
                    "cn": "画",
                    "ms": "melukis"
                },
                "sentences": {
                    "en": "He is drawing on the board.",
                    "cn": "他正在黑板上画画。",
                    "ms": "Dia sedang melukis di atas papan putih."
                }
            },
            {
                "word": "spelling",
                "hint": "The Present Continuous of verb 'spell'",
                "translations": {
                    "cn": "拼写",
                    "ms": "mengeja"
                },
                "sentences": {
                    "en": "I am spelling the difficult word.",
                    "cn": "我正在拼写这个困难的字。",
                    "ms": "Saya sedang mengeja perkataan yang susah itu."
                }
            },
            {
                "word": "talking",
                "hint": "The Present Continuous of verb 'talk'",
                "translations": {
                    "cn": "说话",
                    "ms": "bercakap"
                },
                "sentences": {
                    "en": "They are talking to the teacher.",
                    "cn": "他们正在和老师说话。",
                    "ms": "Mereka sedang bercakap dengan cikgu."
                }
            },
            {
                "word": "looking",
                "hint": "The Present Continuous of verb 'look'",
                "translations": {
                    "cn": "看",
                    "ms": "melihat"
                },
                "sentences": {
                    "en": "She is looking for her keys.",
                    "cn": "她正在找她的钥匙。",
                    "ms": "Dia sedang mencari kuncinya."
                }
            },
            {
                "word": "hearing",
                "hint": "The Present Continuous of verb 'hear'",
                "translations": {
                    "cn": "听见",
                    "ms": "mendengar"
                },
                "sentences": {
                    "en": "He is hearing the news.",
                    "cn": "他正在听新闻。",
                    "ms": "Dia sedang mendengar berita itu."
                }
            },
            {
                "word": "feeling",
                "hint": "The Present Continuous of verb 'feel'",
                "translations": {
                    "cn": "感觉",
                    "ms": "berasa"
                },
                "sentences": {
                    "en": "I am feeling tired today.",
                    "cn": "我今天觉得很累。",
                    "ms": "Saya berasa letih hari ini."
                }
            },
            {
                "word": "tasting",
                "hint": "The Present Continuous of verb 'taste'",
                "translations": {
                    "cn": "品尝",
                    "ms": "merasa"
                },
                "sentences": {
                    "en": "The chef is tasting the food.",
                    "cn": "厨师正在品尝食物。",
                    "ms": "Cef itu sedang merasa makanan itu."
                }
            },
            {
                "word": "touching",
                "hint": "The Present Continuous of verb 'touch'",
                "translations": {
                    "cn": "触摸",
                    "ms": "menyentuh"
                },
                "sentences": {
                    "en": "Do not be touching the exhibits.",
                    "cn": "请勿触摸展品。",
                    "ms": "Jangan menyentuh barang-barang pameran."
                }
            },
            {
                "word": "smelling",
                "hint": "The Present Continuous of verb 'smell'",
                "translations": {
                    "cn": "闻",
                    "ms": "berbau/menghidu"
                },
                "sentences": {
                    "en": "The dog is smelling the ground.",
                    "cn": "狗正在闻地面。",
                    "ms": "Anjing itu sedang menghidu tanah."
                }
            },
            {
                "word": "brushing",
                "hint": "The Present Continuous of verb 'brush'",
                "translations": {
                    "cn": "刷",
                    "ms": "memberus"
                },
                "sentences": {
                    "en": "She is brushing her hair.",
                    "cn": "她正在梳头发。",
                    "ms": "Dia sedang memberus rambutnya."
                }
            },
            {
                "word": "combing",
                "hint": "The Present Continuous of verb 'comb'",
                "translations": {
                    "cn": "梳",
                    "ms": "menyikat"
                },
                "sentences": {
                    "en": "Mother is combing the baby's hair.",
                    "cn": "妈妈正在帮宝宝梳头发。",
                    "ms": "Ibu sedang menyikat rambut bayi."
                }
            },
            {
                "word": "dressing",
                "hint": "The Present Continuous of verb 'dress'",
                "translations": {
                    "cn": "穿衣",
                    "ms": "berpakaian"
                },
                "sentences": {
                    "en": "She is dressing up for the party.",
                    "cn": "她正在为派对打扮。",
                    "ms": "Dia sedang bersiap-siap untuk parti itu."
                }
            },
            {
                "word": "packing",
                "hint": "The Present Continuous of verb 'pack'",
                "translations": {
                    "cn": "打包",
                    "ms": "membungkus"
                },
                "sentences": {
                    "en": "He is packing his lunch box.",
                    "cn": "他正在把食物装进饭盒。",
                    "ms": "Dia sedang membungkus bekalan makanannya."
                }
            },
            {
                "word": "coming",
                "hint": "The Present Continuous of verb 'come'",
                "translations": {
                    "cn": "来",
                    "ms": "datang"
                },
                "sentences": {
                    "en": "The bus is coming now.",
                    "cn": "巴士现在来了。",
                    "ms": "Bas sedang tiba sekarang."
                }
            },
            {
                "word": "sitting",
                "hint": "The Present Continuous of verb 'sit'",
                "translations": {
                    "cn": "坐",
                    "ms": "duduk"
                },
                "sentences": {
                    "en": "The cat is sitting on the chair.",
                    "cn": "猫正坐在椅子上。",
                    "ms": "Kucing itu sedang duduk di atas kerusi."
                }
            },
            {
                "word": "pointing",
                "hint": "The Present Continuous of verb 'point'",
                "translations": {
                    "cn": "指",
                    "ms": "menunjuk"
                },
                "sentences": {
                    "en": "He is pointing to the sky.",
                    "cn": "他正指着天空。",
                    "ms": "Dia sedang menunjuk ke arah langit."
                }
            },
            {
                "word": "opening",
                "hint": "The Present Continuous of verb 'open'",
                "translations": {
                    "cn": "打开",
                    "ms": "membuka"
                },
                "sentences": {
                    "en": "She is opening her present.",
                    "cn": "她正在打开她的礼物。",
                    "ms": "Dia sedang membuka hadiahnya."
                }
            },
            {
                "word": "closing",
                "hint": "The Present Continuous of verb 'close'",
                "translations": {
                    "cn": "关闭",
                    "ms": "menutup"
                },
                "sentences": {
                    "en": "The shop is closing early today.",
                    "cn": "这家店今天提早关门。",
                    "ms": "Kedai itu ditutup awal hari ini."
                }
            },
            {
                "word": "turning",
                "hint": "The Present Continuous of verb 'turn'",
                "translations": {
                    "cn": "转",
                    "ms": "memusing"
                },
                "sentences": {
                    "en": "He is turning the steering wheel.",
                    "cn": "他正在转动方向盘。",
                    "ms": "Dia sedang memusingkan stereng."
                }
            },
            {
                "word": "stopping",
                "hint": "The Present Continuous of verb 'stop'",
                "translations": {
                    "cn": "停止",
                    "ms": "berhenti"
                },
                "sentences": {
                    "en": "The rain is stopping now.",
                    "cn": "雨现在停了。",
                    "ms": "Hujan sedang berhenti sekarang."
                }
            },
            {
                "word": "starting",
                "hint": "The Present Continuous of verb 'start'",
                "translations": {
                    "cn": "开始",
                    "ms": "bermula"
                },
                "sentences": {
                    "en": "The movie is starting soon.",
                    "cn": "电影很快就要开始了。",
                    "ms": "Filem itu akan bermula tidak lama lagi."
                }
            },
            {
                "word": "liking",
                "hint": "The Present Continuous of verb 'like'",
                "translations": {
                    "cn": "喜欢",
                    "ms": "menyukai"
                },
                "sentences": {
                    "en": "She is liking the new song.",
                    "cn": "她开始喜欢这首新歌了。",
                    "ms": "Dia mula menyukai lagu baharu itu."
                }
            },
            {
                "word": "loving",
                "hint": "The Present Continuous of verb 'love'",
                "translations": {
                    "cn": "爱",
                    "ms": "menyayangi"
                },
                "sentences": {
                    "en": "I am loving this beautiful weather.",
                    "cn": "我非常喜欢这美好的天气。",
                    "ms": "Saya sangat menyukai cuaca yang indah ini."
                }
            },
            {
                "word": "hating",
                "hint": "The Present Continuous of verb 'hate'",
                "translations": {
                    "cn": "讨厌",
                    "ms": "membenci"
                },
                "sentences": {
                    "en": "She is hating the loud noise.",
                    "cn": "她很讨厌这个噪音。",
                    "ms": "Dia sangat membenci bunyi bising itu."
                }
            },
            {
                "word": "wanting",
                "hint": "The Present Continuous of verb 'want'",
                "translations": {
                    "cn": "想要",
                    "ms": "mahu"
                },
                "sentences": {
                    "en": "The baby is wanting some milk.",
                    "cn": "宝宝想要喝牛奶。",
                    "ms": "Bayi itu mahukan sedikit susu."
                }
            },
            {
                "word": "needing",
                "hint": "The Present Continuous of verb 'need'",
                "translations": {
                    "cn": "需要",
                    "ms": "memerlukan"
                },
                "sentences": {
                    "en": "He is needing help with his homework.",
                    "cn": "他做功课需要帮忙。",
                    "ms": "Dia memerlukan bantuan untuk kerja rumahnya."
                }
            },
            {
                "word": "having",
                "hint": "The Present Continuous of verb 'have'",
                "translations": {
                    "cn": "有",
                    "ms": "mempunyai"
                },
                "sentences": {
                    "en": "We are having dinner now.",
                    "cn": "我们现在正在吃晚餐。",
                    "ms": "Kami sedang makan malam sekarang."
                }
            },
            {
                "word": "doing",
                "hint": "The Present Continuous of verb 'do'",
                "translations": {
                    "cn": "做",
                    "ms": "membuat"
                },
                "sentences": {
                    "en": "He is doing his work.",
                    "cn": "他正在做他的工作。",
                    "ms": "Dia sedang melakukan kerjanya."
                }
            },
            {
                "word": "cleaning",
                "hint": "The Present Continuous of verb 'clean'",
                "translations": {
                    "cn": "清理",
                    "ms": "membersihkan"
                },
                "sentences": {
                    "en": "They are cleaning the kitchen.",
                    "cn": "他们正在打扫厨房。",
                    "ms": "Mereka sedang membersihkan dapur."
                }
            },
            {
                "word": "tidying",
                "hint": "The Present Continuous of verb 'tidy'",
                "translations": {
                    "cn": "整理",
                    "ms": "mengemas"
                },
                "sentences": {
                    "en": "He is tidying the living room.",
                    "cn": "他正在整理客厅。",
                    "ms": "Dia sedang mengemas ruang tamu."
                }
            },
            {
                "word": "sweeping",
                "hint": "The Present Continuous of verb 'sweep'",
                "translations": {
                    "cn": "扫",
                    "ms": "menyapu"
                },
                "sentences": {
                    "en": "I am sweeping the dry leaves.",
                    "cn": "我正在扫干树叶。",
                    "ms": "Saya sedang menyapu daun-daun kering."
                }
            },
            {
                "word": "mopping",
                "hint": "The Present Continuous of verb 'mop'",
                "translations": {
                    "cn": "拖地",
                    "ms": "mengemop"
                },
                "sentences": {
                    "en": "Mother is mopping the tiles.",
                    "cn": "妈妈正在拖地砖。",
                    "ms": "Ibu sedang mengemop lantai jubin."
                }
            },
            {
                "word": "wiping",
                "hint": "The Present Continuous of verb 'wipe'",
                "translations": {
                    "cn": "擦",
                    "ms": "mengelap"
                },
                "sentences": {
                    "en": "He is wiping the dirty window.",
                    "cn": "他正在擦拭脏窗户。",
                    "ms": "Dia sedang mengelap tingkap yang kotor itu."
                }
            },
            {
                "word": "putting",
                "hint": "The Present Continuous of verb 'put'",
                "translations": {
                    "cn": "放",
                    "ms": "meletakkan"
                },
                "sentences": {
                    "en": "They are putting away the toys.",
                    "cn": "他们正在把玩具收起来。",
                    "ms": "Mereka sedang menyimpan mainan-mainan itu."
                }
            },
            {
                "word": "pulling",
                "hint": "The Present Continuous of verb 'pull'",
                "translations": {
                    "cn": "拉",
                    "ms": "menarik"
                },
                "sentences": {
                    "en": "She is pulling the door open.",
                    "cn": "她正在把门拉开。",
                    "ms": "Dia sedang menarik pintu itu untuk membukanya."
                }
            },
            {
                "word": "pushing",
                "hint": "The Present Continuous of verb 'push'",
                "translations": {
                    "cn": "推",
                    "ms": "menolak"
                },
                "sentences": {
                    "en": "He is pushing the trolley.",
                    "cn": "他正在推手推车。",
                    "ms": "Dia sedang menolak troli itu."
                }
            },
            {
                "word": "carrying",
                "hint": "The Present Continuous of verb 'carry'",
                "translations": {
                    "cn": "携带",
                    "ms": "membawa"
                },
                "sentences": {
                    "en": "The ant is carrying a leaf.",
                    "cn": "蚂蚁正在搬运一片叶子。",
                    "ms": "Semut itu sedang membawa sehelai daun."
                }
            },
            {
                "word": "holding",
                "hint": "The Present Continuous of verb 'hold'",
                "translations": {
                    "cn": "拿着",
                    "ms": "memegang"
                },
                "sentences": {
                    "en": "He is holding a cup of coffee.",
                    "cn": "他正拿着一杯咖啡。",
                    "ms": "Dia sedang memegang secawan kopi."
                }
            },
            {
                "word": "losing",
                "hint": "The Present Continuous of verb 'lose'",
                "translations": {
                    "cn": "丢失",
                    "ms": "hilang"
                },
                "sentences": {
                    "en": "They are losing the football match.",
                    "cn": "他们在这场足球赛中快要输了。",
                    "ms": "Mereka sedang tewas dalam perlawanan bola sepak itu."
                }
            },
            {
                "word": "dropping",
                "hint": "The Present Continuous of verb 'drop'",
                "translations": {
                    "cn": "掉落",
                    "ms": "menjatuhkan"
                },
                "sentences": {
                    "en": "The tree is dropping its leaves.",
                    "cn": "树正在掉叶子。",
                    "ms": "Pokok itu sedang menggugurkan daun-daunnya."
                }
            },
            {
                "word": "breaking",
                "hint": "The Present Continuous of verb 'break'",
                "translations": {
                    "cn": "打破",
                    "ms": "memecahkan"
                },
                "sentences": {
                    "en": "He is breaking the chocolate into pieces.",
                    "cn": "他正在把巧克力掰成小块。",
                    "ms": "Dia sedang mematahkan coklat itu kepada kepingan kecil."
                }
            },
            {
                "word": "fixing",
                "hint": "The Present Continuous of verb 'fix'",
                "translations": {
                    "cn": "修理",
                    "ms": "membaiki"
                },
                "sentences": {
                    "en": "The mechanic is fixing the car.",
                    "cn": "技工正在修理汽车。",
                    "ms": "Mekanik itu sedang membaiki kereta."
                }
            },
            {
                "word": "cutting",
                "hint": "The Present Continuous of verb 'cut'",
                "translations": {
                    "cn": "切",
                    "ms": "memotong"
                },
                "sentences": {
                    "en": "The chef is cutting the vegetables.",
                    "cn": "厨师正在切蔬菜。",
                    "ms": "Cef itu sedang memotong sayur-sayuran."
                }
            },
            {
                "word": "using",
                "hint": "The Present Continuous of verb 'use'",
                "translations": {
                    "cn": "使用",
                    "ms": "menggunakan"
                },
                "sentences": {
                    "en": "She is using her phone.",
                    "cn": "她正在使用她的手机。",
                    "ms": "Dia sedang menggunakan telefonnya."
                }
            },
            {
                "word": "wearing",
                "hint": "The Present Continuous of verb 'wear'",
                "translations": {
                    "cn": "穿",
                    "ms": "memakai"
                },
                "sentences": {
                    "en": "I am wearing a jacket today.",
                    "cn": "我今天穿着一件夹克。",
                    "ms": "Saya sedang memakai jaket hari ini."
                }
            },
            {
                "word": "selling",
                "hint": "The Present Continuous of verb 'sell'",
                "translations": {
                    "cn": "卖",
                    "ms": "menjual"
                },
                "sentences": {
                    "en": "They are selling fruits at the market.",
                    "cn": "他们正在市场卖水果。",
                    "ms": "Mereka sedang menjual buah-buahan di pasar."
                }
            },
            {
                "word": "paying",
                "hint": "The Present Continuous of verb 'pay'",
                "translations": {
                    "cn": "付钱",
                    "ms": "membayar"
                },
                "sentences": {
                    "en": "She is paying the bill.",
                    "cn": "她正在付账单。",
                    "ms": "Dia sedang membayar bil."
                }
            },
            {
                "word": "costing",
                "hint": "The Present Continuous of verb 'cost'",
                "translations": {
                    "cn": "花费",
                    "ms": "berharga"
                },
                "sentences": {
                    "en": "The trip is costing a lot of money.",
                    "cn": "这趟旅行花费很多钱。",
                    "ms": "Percutian itu menelan kos yang banyak."
                }
            },
            {
                "word": "working",
                "hint": "The Present Continuous of verb 'work'",
                "translations": {
                    "cn": "工作",
                    "ms": "bekerja"
                },
                "sentences": {
                    "en": "He is working in the garden.",
                    "cn": "他正在花园里工作。",
                    "ms": "Dia sedang bekerja di taman."
                }
            },
            {
                "word": "building",
                "hint": "The Present Continuous of verb 'build'",
                "translations": {
                    "cn": "建造",
                    "ms": "membina"
                },
                "sentences": {
                    "en": "The workers are building a new house.",
                    "cn": "工人们正在建造一栋新房子。",
                    "ms": "Pekerja-pekerja itu sedang membina sebuah rumah baharu."
                }
            },
            {
                "word": "growing",
                "hint": "The Present Continuous of verb 'grow'",
                "translations": {
                    "cn": "生长",
                    "ms": "tumbuh"
                },
                "sentences": {
                    "en": "The farmer is growing tomatoes.",
                    "cn": "农夫正在种植番茄。",
                    "ms": "Petani itu sedang menanam pokok tomato."
                }
            },
            {
                "word": "planting",
                "hint": "The Present Continuous of verb 'plant'",
                "translations": {
                    "cn": "种植",
                    "ms": "menanam"
                },
                "sentences": {
                    "en": "She is planting some seeds.",
                    "cn": "她正在播种。",
                    "ms": "Dia sedang menanam beberapa biji benih."
                }
            },
            {
                "word": "picking",
                "hint": "The Present Continuous of verb 'pick'",
                "translations": {
                    "cn": "挑选/摘",
                    "ms": "memetik"
                },
                "sentences": {
                    "en": "He is picking the flowers.",
                    "cn": "他正在摘花。",
                    "ms": "Dia sedang memetik bunga."
                }
            },
            {
                "word": "feeding",
                "hint": "The Present Continuous of verb 'feed'",
                "translations": {
                    "cn": "喂",
                    "ms": "memberi makan"
                },
                "sentences": {
                    "en": "I am feeding the chickens.",
                    "cn": "我正在喂鸡。",
                    "ms": "Saya sedang memberi ayam makan."
                }
            },
            {
                "word": "kicking",
                "hint": "The Present Continuous of verb 'kick'",
                "translations": {
                    "cn": "踢",
                    "ms": "menendang"
                },
                "sentences": {
                    "en": "She is kicking the door shut.",
                    "cn": "她正把门踢上。",
                    "ms": "Dia sedang menendang pintu itu supaya tertutup."
                }
            },
            {
                "word": "bouncing",
                "hint": "The Present Continuous of verb 'bounce'",
                "translations": {
                    "cn": "弹",
                    "ms": "melantun"
                },
                "sentences": {
                    "en": "He is bouncing the basketball.",
                    "cn": "他正在拍打篮球。",
                    "ms": "Dia sedang melantunkan bola keranjang itu."
                }
            },
            {
                "word": "hitting",
                "hint": "The Present Continuous of verb 'hit'",
                "translations": {
                    "cn": "打",
                    "ms": "memukul"
                },
                "sentences": {
                    "en": "She is hitting the drum.",
                    "cn": "她正在敲鼓。",
                    "ms": "Dia sedang memukul dram."
                }
            },
            {
                "word": "scoring",
                "hint": "The Present Continuous of verb 'score'",
                "translations": {
                    "cn": "得分",
                    "ms": "menjaringkan"
                },
                "sentences": {
                    "en": "They are scoring very well in the test.",
                    "cn": "他们在考试中取得很好的成绩。",
                    "ms": "Mereka sedang mendapat markah yang baik dalam ujian itu."
                }
            },
            {
                "word": "trying",
                "hint": "The Present Continuous of verb 'try'",
                "translations": {
                    "cn": "尝试",
                    "ms": "mencuba"
                },
                "sentences": {
                    "en": "He is trying to lift the box.",
                    "cn": "他正在尝试搬起那个箱子。",
                    "ms": "Dia sedang mencuba untuk mengangkat kotak itu."
                }
            },
            {
                "word": "guessing",
                "hint": "The Present Continuous of verb 'guess'",
                "translations": {
                    "cn": "猜测",
                    "ms": "meneka"
                },
                "sentences": {
                    "en": "We are guessing the word in Hangman.",
                    "cn": "我们正在猜测 Hangman 游戏里的字。",
                    "ms": "Kami sedang meneka perkataan dalam permainan Hangman."
                }
            },
            {
                "word": "matching",
                "hint": "The Present Continuous of verb 'match'",
                "translations": {
                    "cn": "匹配",
                    "ms": "memadankan"
                },
                "sentences": {
                    "en": "She is matching the colours.",
                    "cn": "她正在匹配这些颜色。",
                    "ms": "Dia sedang memadankan warna-warna tersebut."
                }
            },
            {
                "word": "counting",
                "hint": "The Present Continuous of verb 'count'",
                "translations": {
                    "cn": "数",
                    "ms": "mengira"
                },
                "sentences": {
                    "en": "The teacher is counting the students.",
                    "cn": "老师正在数学生的人数。",
                    "ms": "Cikgu sedang mengira bilangan murid."
                }
            }
        ]
    }
};
