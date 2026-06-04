export const anatomyGuide = [
  { region: "The Posterior Chain (Glutes, Hamstrings, Lower Back)", description: "The engine room. Every shot, lift, and mat return starts here." },
  { region: "The Pulling Muscles (Upper Back, Lats, Rear Delts)", description: "Essential for hand fighting, snapping opponents down, and holding tight gut wrenches or cradles." },
  { region: "The Neck & Upper Traps", description: "Your insurance policy. A strong neck prevents concussions, allows you to bridge out of trouble, and keeps your head up in a hard front headlock." },
  { region: "The Core (Abs, Obliques, Lower Back)", description: "Transfers power from your feet to your hands. Wrestlers need rotational power and static bracing strength (anti-rotation)." },
  { region: "Shoulders & Chest", description: "Crucial for pushing away, heavy hand fighting, and maintaining structural integrity so your shoulders don’t get popped out of position." },
  { region: "Grip & Forearms", description: "If your grip dies, your wrestling dies. Period." }
];

export const libraryData = [
  {
    id: 'beginner',
    title: 'Phase 1: Foundation',
    description: 'Perfect for new athletes. Master movement patterns, build tendon strength, and introduce neck/grip capacity (3-Day Split).',
    image: '/assets/beginner_squat.png',
    exercises: [
      { 
        name: "Goblet Squats", 
        description: "1. Setup: Stand with feet slightly wider than shoulder-width, toes pointed slightly out. Hold a dumbbell or kettlebell vertically against your chest with both hands.\n2. Execution: Keeping your chest up, push your hips back and bend your knees to lower into a squat until your elbows touch the inside of your knees. Drive through your whole foot to stand back up.\n3. Coaching Cue: Imagine prying your knees apart with your elbows at the bottom to open up the hips—essential for wrestling stances.", 
        image: "/assets/exercises/goblet_squat.png" 
      },
      { 
        name: "Romanian Deadlifts (RDLs)", 
        description: "1. Setup: Stand with feet hip-width apart holding a barbell or dumbbells in front of your thighs. Keep a soft bend in your knees.\n2. Execution: Hinge strictly at your hips, pushing your glutes backward while keeping the weight dragged down your legs. Stop when you feel a deep stretch in your hamstrings, then squeeze your glutes to return to standing.\n3. Coaching Cue: Imagine you are trying to close a car door with your butt. Do not bend your lower back.", 
        image: "/assets/exercises/rdl.png" 
      },
      { 
        name: "Walking Lunges", 
        description: "1. Setup: Stand tall holding dumbbells by your sides. Keep your core tight and chest proud.\n2. Execution: Take a large step forward and drop your back knee straight down until it hovers just above the floor. Both knees should be at 90 degrees. Push off your back foot and step forward into the next lunge seamlessly.\n3. Coaching Cue: Drive through the heel of your front foot. This builds the unilateral power needed to finish a single leg takedown.", 
        image: "/assets/exercises/walking_lunges.png" 
      },
      { 
        name: "Plank Hold", 
        description: "1. Setup: Lie face down, then prop yourself up on your forearms and toes. Elbows directly under shoulders.\n2. Execution: Brace your core as if you are about to be punched. Hold the straight line from your head to your heels without letting your hips sag.\n3. Coaching Cue: Actively pull your elbows toward your toes to ignite the abdominal wall.", 
        image: "/assets/exercises/plank.png" 
      },
      { 
        name: "Farmer’s Walks", 
        description: "1. Setup: Stand tall holding the heaviest dumbbells or kettlebells you can handle in each hand. Pin your shoulders back and down.\n2. Execution: Walk forward with short, rapid, heel-to-toe steps. Keep your torso completely upright and rigid. Do not let the weights sway.\n3. Coaching Cue: Crush the handles as hard as possible. This builds total body rigidity and iron grip strength.", 
        image: "/assets/exercises/farmers_walk.png" 
      },
      { 
        name: "Inverted Bodyweight Rows", 
        description: "1. Setup: Set a barbell in a rack at waist height. Lie underneath and grab it slightly wider than shoulder-width. Keep your body straight with only heels on the floor.\n2. Execution: Pull your chest to the bar by driving your elbows down and back. Lower under control.\n3. Coaching Cue: Pull with your back, not your biceps. Critical for snapping opponents down.", 
        image: "/assets/exercises/inverted_row.png" 
      },
      { 
        name: "Dumbbell Floor Press", 
        description: "1. Setup: Lie on your back on the floor with your knees bent and feet flat. Hold dumbbells over your chest with straight arms.\n2. Execution: Lower the dumbbells until your triceps gently touch the floor. Pause for a split second, then press the weights back up to lockout.\n3. Coaching Cue: This builds massive chest and tricep pressing power while saving the shoulder joints.", 
        image: "/assets/exercises/floor_press.png" 
      },
      { 
        name: "Seated Dumbbell Shoulder Press", 
        description: "1. Setup: Sit on an upright bench. Kick the dumbbells up to shoulder height, palms facing forward.\n2. Execution: Press the dumbbells straight overhead until your arms are fully locked out. Slowly lower them back to your shoulders under control.\n3. Coaching Cue: Don't excessively arch your lower back. This builds the vertical pushing power to frame away from opponents.", 
        image: "/assets/exercises/shoulder_press.png" 
      },
      { 
        name: "Dumbbell Shrugs", 
        description: "1. Setup: Stand tall holding heavy dumbbells by your sides. Let your arms hang completely straight.\n2. Execution: Elevate your shoulders straight up toward your ears as high as possible. Hold the contraction for a full second at the top, then slowly lower.\n3. Coaching Cue: Do not roll your shoulders in circles. Just straight up and down. Building the upper traps is step one of neck protection.", 
        image: "/assets/exercises/db_shrugs.png" 
      },
      { 
        name: "Manual Neck Resistance", 
        description: "1. Setup: Sit down. Place the heel of your hand against your forehead.\n2. Execution: Press your head forward into your hand, providing enough resistance with your hand to make the neck muscles work hard but still allowing very slow movement. Perform for the front, back, and sides of the head.\n3. Coaching Cue: Keep the movements slow and controlled to build basic neck tolerance.", 
        image: "/assets/exercises/neck_resistance.png" 
      },
      { 
        name: "Trap Bar Deadlifts", 
        description: "1. Setup: Step inside the trap bar. Push your hips back and bend your knees to grip the handles. Keep your chest up and back flat.\n2. Execution: Drive the floor away with your legs while simultaneously pulling up on the bar. Stand tall and squeeze your glutes at the top.\n3. Coaching Cue: 'Leg press the floor.' This provides explosive hip drive without the sheer stress of a straight barbell.", 
        image: "/assets/exercises/trap_bar_deadlift.png" 
      },
      { 
        name: "Push-ups", 
        description: "1. Setup: High plank position, hands slightly wider than shoulder-width. Body in a straight line.\n2. Execution: Lower your chest just above the floor, keeping elbows tucked at 45 degrees. Push back up forcefully.\n3. Coaching Cue: Squeeze your glutes to prevent your lower back from sagging.", 
        image: "/assets/exercises/pushup.png" 
      },
      { 
        name: "Lat Pulldowns", 
        description: "1. Setup: Sit at a lat pulldown machine and grab the wide bar with an overhand grip. Lock your knees under the pads.\n2. Execution: Lean back slightly and pull the bar down to your upper chest by driving your elbows down and back. Slowly let the bar return to the top.\n3. Coaching Cue: Think about pulling your elbows to your back pockets. Crucial for controlling inside ties.", 
        image: "/assets/exercises/lat_pulldown.png" 
      },
      { 
        name: "Hanging Knee Raises", 
        description: "1. Setup: Hang from a pull-up bar with a dead-hang grip. Keep your shoulders active.\n2. Execution: Brace your core and pull your knees up toward your chest as high as possible. Lower them slowly back to a straight hang without swinging.\n3. Coaching Cue: Flex your lower abs to pull the knees up. Don't just use momentum.", 
        image: "/assets/exercises/knee_raises.png" 
      },
      { 
        name: "Plate Pinches", 
        description: "1. Setup: Stand up and hold two weight plates (e.g., two 10lb or 25lb plates) sandwiched together in one hand, smooth sides facing out.\n2. Execution: Squeeze the plates together with only your fingertips and thumb. Hold for maximum time without dropping them.\n3. Coaching Cue: Don't let the plates rest against your leg or body. Pure finger and thumb grip endurance.", 
        image: "/assets/exercises/plate_pinch.png" 
      }
    ],
    workouts: [
      { name: "Day 1: Lower Body & Core", focus: "Mastering movement patterns", routine: [{name: "Goblet Squats", reps: "3x10"}, {name: "Romanian Deadlifts (RDLs)", reps: "3x8"}, {name: "Walking Lunges", reps: "2x10/leg"}, {name: "Plank Hold", reps: "3x45s"}, {name: "Farmer’s Walks", reps: "3x50yds"}] },
      { name: "Day 2: Upper Pull/Push & Neck", focus: "Building upper body stability", routine: [{name: "Inverted Bodyweight Rows", reps: "3xMax"}, {name: "Dumbbell Floor Press", reps: "3x10"}, {name: "Seated Dumbbell Shoulder Press", reps: "3x8"}, {name: "Dumbbell Shrugs", reps: "3x12"}, {name: "Manual Neck Resistance", reps: "3x10/dir"}] },
      { name: "Day 3: Full Body & Grip", focus: "Functional explosion and grip", routine: [{name: "Trap Bar Deadlifts", reps: "3x5"}, {name: "Push-ups", reps: "3xMax"}, {name: "Lat Pulldowns", reps: "3x8"}, {name: "Hanging Knee Raises", reps: "3x12"}, {name: "Plate Pinches", reps: "3x30s"}] }
    ]
  },
  {
    id: 'intermediate',
    title: 'Phase 2: Power Generation',
    description: 'Increasing absolute strength, adding volume, and integrating explosive movements (4-Day Upper/Lower Split).',
    image: '/assets/intermediate_clean.png',
    exercises: [
      { 
        name: "Barbell Back Squats", 
        description: "1. Setup: Step under the bar so it rests securely on your upper traps. Unrack it, step back, and set your feet slightly wider than shoulder-width.\n2. Execution: Take a deep breath, brace your core, and sit your hips down and back until your thighs are parallel to the floor. Drive through your mid-foot to stand back up.\n3. Coaching Cue: Push your knees out to create room for your hips. Keep your chest tall.", 
        image: "/assets/exercises/back_squat.png" 
      },
      { 
        name: "Barbell Hip Thrusts", 
        description: "1. Setup: Sit on the floor with a bench directly behind you. Roll a barbell over your hips. Lean back against the bench so your shoulder blades are supported.\n2. Execution: Drive through your heels to bridge your hips up until your body forms a straight line from shoulders to knees. Squeeze your glutes hard at the top, then lower under control.\n3. Coaching Cue: Keep your chin tucked to your chest to prevent hyperextending your lower back.", 
        image: "/assets/exercises/hip_thrust.png" 
      },
      { 
        name: "Bulgarian Split Squats", 
        description: "1. Setup: Stand a few feet in front of a bench holding dumbbells. Reach one foot back and rest the top of your foot on the bench.\n2. Execution: Lower your hips until your front thigh is parallel to the floor and your back knee almost touches the ground. Drive through your front heel to stand up.\n3. Coaching Cue: Keep your torso slightly leaned forward to target the glutes and hamstrings—essential for shooting off one leg.", 
        image: "/assets/exercises/bulgarian_split_squat.png" 
      },
      { 
        name: "Hanging Leg Raises", 
        description: "1. Setup: Hang from a pull-up bar with a dead-hang grip. Keep your legs completely straight and together.\n2. Execution: Brace your core and lift your straight legs until they are parallel to the floor (or higher). Lower them slowly and under complete control.\n3. Coaching Cue: Don't swing! Use your abdominal strength to pull your legs up, not momentum.", 
        image: "/assets/exercises/hanging_leg_raise.png" 
      },
      { 
        name: "Med Ball Rotational Throws", 
        description: "1. Setup: Stand sideways to a solid wall about an arm's length away, holding a medicine ball at waist height.\n2. Execution: Load your weight onto your back leg by twisting slightly away from the wall. Explosively rotate your hips and throw the ball as hard as possible into the wall.\n3. Coaching Cue: The power comes from your hips violently twisting, not just your arms. Perfect for throwing techniques.", 
        image: "/assets/exercises/med_ball_throw.png" 
      },
      { 
        name: "Weighted Pull-ups", 
        description: "1. Setup: Strap a weight plate to a dip belt around your waist. Grab a pull-up bar with an overhand grip, slightly wider than shoulder width.\n2. Execution: Pull your chest to the bar by driving your elbows down and back. Lower yourself under control until your arms are fully extended.\n3. Coaching Cue: Squeeze your glutes and brace your core so the weight doesn't swing. Pure snapping power.", 
        image: "/assets/exercises/weighted_pullup.png" 
      },
      { 
        name: "Barbell Row (Overhand)", 
        description: "1. Setup: Hold a barbell with a shoulder-width overhand grip. Hinge at your hips until your torso is nearly parallel to the floor.\n2. Execution: Pull the barbell up to your lower ribcage by driving your elbows up and back. Squeeze your shoulder blades together, then lower the bar.\n3. Coaching Cue: Keep your lower back perfectly flat and motionless. Do not jerk the weight.", 
        image: "/assets/exercises/barbell_row.png" 
      },
      { 
        name: "Incline Dumbbell Press", 
        description: "1. Setup: Set a bench to a 30-45 degree incline. Sit with dumbbells resting on your thighs, then kick them up to your shoulders as you lean back.\n2. Execution: Press the dumbbells straight up until your arms are locked out. Lower them slowly until they are at shoulder level.\n3. Coaching Cue: Keep your shoulder blades pinned back against the bench for shoulder health and stability.", 
        image: "/assets/exercises/incline_db_press.png" 
      },
      { 
        name: "Standing Overhead Press", 
        description: "1. Setup: Stand with feet shoulder-width apart, holding a barbell at upper chest level with a grip slightly wider than shoulder-width.\n2. Execution: Brace your core and glutes. Press the bar straight up overhead until your arms are locked. Lower it back down under control.\n3. Coaching Cue: Move your head slightly back as the bar goes up, then push your head forward 'through the window' at the top.", 
        image: "/assets/exercises/overhead_press.png" 
      },
      { 
        name: "4-Way Neck Machine", 
        description: "1. Setup: Sit in the neck machine and adjust the pad so it rests comfortably against your head.\n2. Execution: Perform neck flexion (pressing forward), extension (pressing backward), and lateral flexion (pressing to the sides). Move through a full, controlled range of motion.\n3. Coaching Cue: Keep your torso completely still; make your neck do 100% of the work.", 
        image: "/assets/exercises/neck_machine.png" 
      },
      { 
        name: "Conventional Deadlifts", 
        description: "1. Setup: Stand with feet hip-width apart, mid-foot under the barbell. Hinge at the hips and bend your knees to grab the bar just outside your legs.\n2. Execution: Keep your chest up and back flat. Drive through the floor with your legs and push your hips forward to stand up with the weight.\n3. Coaching Cue: Think about dragging the bar up your shins and thighs. Protect your lower back.", 
        image: "/assets/exercises/conventional_deadlift.png" 
      },
      { 
        name: "Dumbbell Clean and Press", 
        description: "1. Setup: Stand holding dumbbells by your sides. Hinge slightly at the hips.\n2. Execution: Explosively extend your hips and pull the dumbbells up to your shoulders (the clean). Immediately use a slight knee dip to drive the dumbbells overhead (the press).\n3. Coaching Cue: This is one fluid, explosive full-body movement, not two slow, separated lifts.", 
        image: "/assets/exercises/db_clean_press.png" 
      },
      { 
        name: "Face Pulls", 
        description: "1. Setup: Attach a rope to a cable pulley at upper-chest height. Grab the rope with both hands, thumbs pointing toward your face.\n2. Execution: Pull the rope toward your face, splitting the ends apart so your hands go past your ears. Squeeze your rear delts and upper back.\n3. Coaching Cue: Imagine hitting a 'double bicep' pose at the end of the movement. Elite shoulder prehab.", 
        image: "/assets/exercises/face_pulls.png" 
      },
      { 
        name: "Dips", 
        description: "1. Setup: Jump up on parallel dip bars, arms locked out, chest slightly pitched forward.\n2. Execution: Lower your body by bending your elbows until your shoulders are just below your elbows. Press back up forcefully to lockout.\n3. Coaching Cue: Squeeze the bars hard to create stability in your shoulders and prevent shaking.", 
        image: "/assets/exercises/dips.png" 
      },
      { 
        name: "Heavy Fat-Grip Holds", 
        description: "1. Setup: Attach Fat Gripz to heavy dumbbells or use a thick barbell. Stand tall.\n2. Execution: Pick up the weight and hold it at your sides for the prescribed amount of time. Keep your shoulders packed down and back.\n3. Coaching Cue: Squeeze the grips as if you are trying to leave fingerprints in the rubber. Extreme forearm taxation.", 
        image: "/assets/exercises/fat_grip_holds.png" 
      },
      { 
        name: "Box Jumps", 
        description: "1. Setup: Stand facing a sturdy plyo box. Feet shoulder-width apart.\n2. Execution: Drop into a quarter squat, swinging your arms back. Explosively jump up onto the box, swinging your arms forward. Land softly with bent knees.\n3. Coaching Cue: Step down off the box—do not jump down backwards, as it places unnecessary stress on the Achilles tendon.", 
        image: "/assets/exercises/box_jump.png" 
      }
    ],
    workouts: [
      { name: "Day 1: Max Effort Lower", focus: "Glute/Core Drive", routine: [{name: "Barbell Back Squats", reps: "4x5"}, {name: "Barbell Hip Thrusts", reps: "3x8"}, {name: "Bulgarian Split Squats", reps: "3x8/leg"}, {name: "Hanging Leg Raises", reps: "3x10"}, {name: "Med Ball Rotational Throws", reps: "3x8/side"}] },
      { name: "Day 2: Upper Pull Dominant", focus: "Mid-back for hand fighting", routine: [{name: "Weighted Pull-ups", reps: "4x5"}, {name: "Barbell Row (Overhand)", reps: "3x8"}, {name: "Incline Dumbbell Press", reps: "3x8"}, {name: "Standing Overhead Press", reps: "3x6"}, {name: "4-Way Neck Machine", reps: "3x12"}] },
      { name: "Day 3: Dynamic Lower", focus: "Speed and Explosion", routine: [{name: "Box Jumps", reps: "5x3"}, {name: "Conventional Deadlifts", reps: "4x4"}, {name: "Bulgarian Split Squats", reps: "3x6/leg"}, {name: "Hanging Leg Raises", reps: "3x10"}] },
      { name: "Day 4: Posterior & Grip", focus: "Full-body transfer", routine: [{name: "Dumbbell Clean and Press", reps: "3x6"}, {name: "Face Pulls", reps: "3x15"}, {name: "Dips", reps: "3x10"}, {name: "Heavy Fat-Grip Holds", reps: "3xMax"}] }
    ]
  },
  {
    id: 'advanced',
    title: 'Phase 3: The Mat Monster',
    description: 'High-threshold power output, isometric bracing, and chaotic core stability (4-Day Conjugate Split).',
    image: '/assets/advanced_deadlift.png',
    exercises: [
      { 
        name: "Barbell Power Cleans", 
        description: "1. Setup: Stand with feet hip-width apart, grip the bar just outside your legs. Drop your hips, chest up, arms straight.\n2. Execution: Explosively extend your hips, knees, and ankles (triple extension) while shrugging your shoulders to pull the bar upward. Quickly drop under the bar and catch it on your front delts with elbows high. Stand up tall.\n3. Coaching Cue: Think 'jump and shrug.' This is the ultimate wrestling lift for raw explosion.", 
        image: "/assets/exercises/power_clean.png" 
      },
      { 
        name: "Front Squats", 
        description: "1. Setup: Rest a barbell across your front delts and collarbone. Keep your elbows pointing straight forward. Feet shoulder-width apart.\n2. Execution: Brace your core extremely hard. Sit your hips down and back while keeping your chest totally upright. Drive back up.\n3. Coaching Cue: If your elbows drop, the bar drops. Forces immense upper back and core rigidity.", 
        image: "/assets/exercises/front_squat.png" 
      },
      { 
        name: "Glute-Ham Raises (GHR)", 
        description: "1. Setup: Lock your feet into the GHR machine with your knees resting just below the pad. Start in a kneeling position.\n2. Execution: Slowly lower your torso forward under control until your body is straight. Contract your hamstrings to pull yourself back up to the kneeling position.\n3. Coaching Cue: Don't cheat by bending at the hips. Keep a straight line from knees to shoulders.", 
        image: "/assets/exercises/ghr.png" 
      },
      { 
        name: "Cable Woodchoppers", 
        description: "1. Setup: Attach a handle to a high cable pulley. Stand sideways to the machine, feet shoulder-width apart, gripping the handle with both hands.\n2. Execution: Pull the handle diagonally down across your body toward your opposite knee by rotating your torso and hips.\n3. Coaching Cue: Your arms are just hooks; the power must come from violently twisting your core.", 
        image: "/assets/exercises/woodchopper.png" 
      },
      { 
        name: "Ab Wheel Rollouts", 
        description: "1. Setup: Kneel on a soft pad holding an ab wheel. Keep your arms straight and brace your core.\n2. Execution: Slowly roll the wheel forward as far as you can without letting your lower back sag. Use your abs to pull the wheel back to the starting position.\n3. Coaching Cue: Squeeze your glutes the entire time to lock your pelvis in place.", 
        image: "/assets/exercises/ab_wheel.png" 
      },
      { 
        name: "Weighted Chin-ups (Fat Gripz)", 
        description: "1. Setup: Attach Fat Gripz to a pull-up bar. Strap a weight to your waist. Grab the bar with an underhand grip.\n2. Execution: Pull your chin over the bar while keeping your elbows tight to your body. Lower under control.\n3. Coaching Cue: The thick grips will destroy your forearms. Squeeze the bar to recruit maximum muscle fibers.", 
        image: "/assets/exercises/fat_grip_chinup.png" 
      },
      { 
        name: "Heavy DB Bench Press", 
        description: "1. Setup: Lie back on a flat bench holding heavy dumbbells straight over your chest.\n2. Execution: Lower the dumbbells to the outside of your chest, keeping your elbows tucked at a 45-degree angle. Press forcefully back up to lockout.\n3. Coaching Cue: Drive your feet into the floor to generate full-body tension.", 
        image: "/assets/exercises/heavy_db_bench.png" 
      },
      { 
        name: "Meadows Rows", 
        description: "1. Setup: Stand perpendicular to a landmine barbell. Stagger your stance and hinge forward, resting your elbow on your front knee. Grab the thick end of the barbell with an overhand grip.\n2. Execution: Pull the barbell up toward your hip, driving your elbow high. Lower under control.\n3. Coaching Cue: This unilateral movement builds massive lat and grip strength for underhooks.", 
        image: "/assets/exercises/meadows_row.png" 
      },
      { 
        name: "Z-Press", 
        description: "1. Setup: Sit flat on the floor with your legs straight out in front of you. Hold dumbbells or a barbell at shoulder height.\n2. Execution: Without leaning back or bending your knees, press the weight strictly overhead until lockout. Lower slowly.\n3. Coaching Cue: Because you have no leg drive, this demands absolute core and shoulder stability.", 
        image: "/assets/exercises/z_press.png" 
      },
      { 
        name: "Wrestler's Bridge (Neck)", 
        description: "1. Setup: Lie on your back on a wrestling mat. Bring your heels close to your glutes.\n2. Execution: Push through your feet and arch your back, rolling up onto the crown of your head. Keep your hands off the mat if possible. Hold the bridge isometrically.\n3. Coaching Cue: Do not bridge onto your forehead; stay on the crown. Essential for avoiding pins.", 
        image: "/assets/exercises/wrestlers_bridge.png" 
      },
      { 
        name: "Deficit Deadlifts", 
        description: "1. Setup: Stand on a 2-4 inch block or weight plate. Set up exactly like a conventional deadlift.\n2. Execution: Because of the deficit, you must drop your hips lower. Drive the floor away to stand up with the weight.\n3. Coaching Cue: This builds tremendous raw power off the floor to help you lift opponents.", 
        image: "/assets/exercises/deficit_deadlift.png" 
      },
      { 
        name: "Sandbag Bear Hug Carries", 
        description: "1. Setup: Squat down and wrap your arms entirely around a heavy sandbag. Deadlift it up to your stomach/chest.\n2. Execution: Clasp your hands together and squeeze the bag tight to your body. Walk forward with short, braced steps.\n3. Coaching Cue: Mimics squeezing an opponent for a mat return or throw. Don't lean back excessively.", 
        image: "/assets/exercises/sandbag_carry.png" 
      },
      { 
        name: "Heavy Kettlebell Swings", 
        description: "1. Setup: Stand with feet slightly wider than shoulder-width, holding a heavy kettlebell with both hands between your legs.\n2. Execution: Hinge at the hips to swing the bell back between your legs, then violently snap your hips forward to launch the bell up to chest height.\n3. Coaching Cue: This is a hip hinge, not a squat. The power comes entirely from the glutes and hamstrings.", 
        image: "/assets/exercises/kb_swing.png" 
      },
      { 
        name: "Towel Pull-ups", 
        description: "1. Setup: Drape two thick towels over a pull-up bar. Grab one towel tightly in each hand.\n2. Execution: Hang freely, then pull yourself up until your hands are at your chest. Lower under control.\n3. Coaching Cue: If your grip slips, the set is over. Replicates grabbing an opponent's gi or wrist.", 
        image: "/assets/exercises/towel_pullup.png" 
      },
      { 
        name: "Pallof Press", 
        description: "1. Setup: Attach a resistance band to a pole at chest height. Stand sideways to the pole, step away to create tension, and hold the band against your chest with both hands.\n2. Execution: Press the band straight out in front of you. The band will try to twist your torso; use your core to resist the rotation. Hold for a second, then return to your chest.\n3. Coaching Cue: 'Anti-rotation' is critical for wrestlers to stop opponents from twisting them off balance.", 
        image: "/assets/exercises/pallof_press.png" 
      }
    ],
    workouts: [
      { name: "Day 1: Dynamic Lower", focus: "Explosive Extension", routine: [{name: "Barbell Power Cleans", reps: "5x3"}, {name: "Front Squats", reps: "4x4"}, {name: "Glute-Ham Raises (GHR)", reps: "3x8"}, {name: "Cable Woodchoppers", reps: "3x10/side"}, {name: "Ab Wheel Rollouts", reps: "3xMax"}] },
      { name: "Day 2: Upper Chaos", focus: "Massive hand/wrist stability", routine: [{name: "Weighted Chin-ups (Fat Gripz)", reps: "4x6"}, {name: "Heavy DB Bench Press", reps: "4x6"}, {name: "Meadows Rows", reps: "3x8/side"}, {name: "Z-Press", reps: "3x6"}, {name: "Wrestler's Bridge (Neck)", reps: "3x30s"}] },
      { name: "Day 3: Max Effort Lower", focus: "Absolute Strength", routine: [{name: "Deficit Deadlifts", reps: "3x3"}, {name: "Front Squats", reps: "3x3"}, {name: "Glute-Ham Raises (GHR)", reps: "3x6"}, {name: "Ab Wheel Rollouts", reps: "3xMax"}] },
      { name: "Day 4: GPP Conditioning", focus: "Mat Endurance", routine: [{name: "Sandbag Bear Hug Carries", reps: "3x100ft"}, {name: "Heavy Kettlebell Swings", reps: "3x15"}, {name: "Towel Pull-ups", reps: "3xMax"}, {name: "Pallof Press", reps: "3x12/side"}] }
    ]
  },
  {
    id: 'elite',
    title: 'Phase 4: In-Season Maintenance',
    description: 'Keep the blade sharp. 2-Day maintenance phase focused on preserving strength while managing fatigue.',
    image: '/assets/advanced_deadlift.png', // Temporary, will replace
    exercises: [
      { 
        name: "Speed Squats", 
        description: "1. Setup: Stand with feet slightly wider than shoulder-width apart, toes pointed slightly out. Keep your chest up and core braced.\n2. Execution: Drop your hips back and down rapidly (descending fast but under control) until your thighs are parallel to the floor. Without pausing, explode back up to the starting position as fast as possible.\n3. Coaching Cue: 'Drop and pop' - imagine you are a coiled spring releasing maximum velocity to maintain CNS activation.", 
        image: "/assets/exercises/speed_squat_1780531748786.png" 
      },
      { 
        name: "Banded Pull-aparts", 
        description: "1. Setup: Stand tall holding a resistance band with an overhand grip, hands roughly shoulder-width apart. Extend your arms straight out in front of your chest.\n2. Execution: Keeping your arms straight (with a slight micro-bend in the elbows), pull the band apart by squeezing your shoulder blades together until the band touches your chest. Slowly return to the starting position.\n3. Coaching Cue: Focus on pinching a pencil between your shoulder blades to activate the rear delts and upper back.", 
        image: "/assets/exercises/band_pullapart_1780531756701.png" 
      },
      { 
        name: "Bodyweight Lunges", 
        description: "1. Setup: Stand tall with feet hip-width apart and hands on your hips or by your sides.\n2. Execution: Take a large step forward with your right leg. Lower your hips until both knees are bent at a 90-degree angle. Your back knee should hover just above the ground. Push off your right foot to return to the start.\n3. Coaching Cue: Keep your torso upright and don't let your front knee cave inward. Perfect for active recovery.", 
        image: "/assets/exercises/bw_lunge_1780531763294.png" 
      },
      { 
        name: "Static Dead-hangs", 
        description: "1. Setup: Grab a pull-up bar with an overhand grip, hands slightly wider than shoulder-width apart.\n2. Execution: Step off the box or bench and let your body hang freely. Relax your shoulders slightly to allow your spine to decompress, but keep a tight grip on the bar.\n3. Coaching Cue: Breathe deeply into your belly and let gravity pull your hips down to decompress the spine and build raw grip stamina.", 
        image: "/assets/exercises/dead_hang_1780531773237.png" 
      },
      { 
        name: "Neck Isometrics", 
        description: "1. Setup: Sit or stand tall. Place the palms of both hands against your forehead.\n2. Execution: Press your head forward into your hands while pushing back equally hard with your hands. There should be no actual movement. Hold the tension for the prescribed time. Repeat this by placing your hands on the back of your head (pressing backward) and on the sides (pressing laterally).\n3. Coaching Cue: Ramp up the tension gradually—don't jerk your neck. Keep your jaw relaxed.", 
        image: "/assets/exercises/neck_iso_1780531782716.png" 
      },
      { 
        name: "Push-ups", 
        description: "1. Setup: Start in a high plank position with your hands placed slightly wider than shoulder-width apart. Your body should form a straight line from your head to your heels.\n2. Execution: Lower your body by bending your elbows until your chest is just above the floor. Keep your elbows tucked at a 45-degree angle. Push back up forcefully to the starting position.\n3. Coaching Cue: Squeeze your glutes and brace your core—don't let your lower back sag.", 
        image: "/assets/exercises/pushup_1780531792476.png" 
      },
      { 
        name: "Inverted Bodyweight Rows", 
        description: "1. Setup: Set a barbell in a rack at waist height. Lie underneath it and grab the bar with an overhand grip slightly wider than shoulder-width. Keep your body in a straight line with only your heels on the ground.\n2. Execution: Pull your chest up to the bar by driving your elbows down and back. Squeeze your back at the top, then lower yourself under control.\n3. Coaching Cue: Pull with your back, not your biceps. Keep your hips up.", 
        image: "/assets/exercises/inverted_row_1780531801152.png" 
      },
      { 
        name: "Plank Hold", 
        description: "1. Setup: Lie face down on the floor, then prop yourself up on your forearms and toes. Your elbows should be directly beneath your shoulders.\n2. Execution: Brace your core as if you are about to be punched in the stomach. Hold this perfectly straight position without letting your hips sag or hike up into the air.\n3. Coaching Cue: Actively pull your elbows toward your toes (creating tension in the floor) to fully ignite the abdominal wall.", 
        image: "/assets/exercises/plank_1780531811074.png" 
      }
    ],
    workouts: [
      { name: "Day 1: Speed & Prehab", focus: "CNS Maintenance", routine: [{name: "Speed Squats", reps: "5x3 (50%)"}, {name: "Banded Pull-aparts", reps: "3x20"}, {name: "Bodyweight Lunges", reps: "3x10/leg"}, {name: "Neck Isometrics", reps: "3x30s"}] },
      { name: "Day 2: Decompression & Grip", focus: "Recovery", routine: [{name: "Push-ups", reps: "3x15"}, {name: "Inverted Bodyweight Rows", reps: "3x12"}, {name: "Static Dead-hangs", reps: "3x60s"}, {name: "Plank Hold", reps: "3x60s"}] }
    ]
  }
];
