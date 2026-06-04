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
      { name: "Goblet Squats", description: "Keep chest up. Drive through heels. Excellent for hip mobility required in wrestling stances.", image: "/assets/exercises/goblet_squat.png" },
      { name: "Romanian Deadlifts (RDLs)", description: "Learning to hinge at the hips. Essential for posterior chain strength.", image: "/assets/exercises/rdl.png" },
      { name: "Walking Lunges", description: "Builds unilateral stability needed for penetrating shots.", image: "/assets/exercises/walking_lunges.png" },
      { name: "Plank Hold", description: "Core stability is crucial. Keep back flat, no sagging.", image: "/assets/exercises/plank.png" },
      { name: "Farmer’s Walks", description: "Total body rigidity and iron grip strength.", image: "/assets/exercises/farmers_walk.png" },
      { name: "Inverted Bodyweight Rows", description: "Pulling strength for handfighting and snapping opponents down.", image: "/assets/exercises/inverted_row.png" },
      { name: "Dumbbell Floor Press", description: "Saves the shoulders while building chest/triceps for posting.", image: "/assets/exercises/floor_press.png" },
      { name: "Seated Dumbbell Shoulder Press", description: "Vertical pushing power to frame away from opponents.", image: "/assets/exercises/shoulder_press.png" },
      { name: "Dumbbell Shrugs", description: "Building the upper traps to protect the neck.", image: "/assets/exercises/db_shrugs.png" },
      { name: "Manual Neck Resistance", description: "Your insurance policy. Build tolerance using your own hand or a partner.", image: "/assets/exercises/neck_resistance.png" },
      { name: "Trap Bar Deadlifts", description: "Explosive hip drive without the lower back sheer stress of a straight bar.", image: "/assets/exercises/trap_bar_deadlift.png" },
      { name: "Push-ups", description: "Basic pressing endurance.", image: "/assets/exercises/pushup.png" },
      { name: "Lat Pulldowns", description: "Vertical pulling strength for controlling ties.", image: "/assets/exercises/lat_pulldown.png" },
      { name: "Hanging Knee Raises", description: "Lower core flexion.", image: "/assets/exercises/knee_raises.png" },
      { name: "Plate Pinches", description: "Pure grip endurance.", image: "/assets/exercises/plate_pinch.png" }
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
      { name: "Barbell Back Squats", description: "Heavy but clean. The core lower body driver.", image: "/assets/exercises/back_squat.png" },
      { name: "Barbell Hip Thrusts", description: "Pure glute power for finishing shots.", image: "/assets/exercises/hip_thrust.png" },
      { name: "Bulgarian Split Squats", description: "Unilateral leg strength. Essential for shooting off one leg and finishing singles.", image: "/assets/exercises/bulgarian_split_squat.png" },
      { name: "Hanging Leg Raises", description: "Advanced core flexion.", image: "/assets/exercises/hanging_leg_raise.png" },
      { name: "Med Ball Rotational Throws", description: "Explosive core rotation for throwing.", image: "/assets/exercises/med_ball_throw.png" },
      { name: "Weighted Pull-ups", description: "Builds the heavy pulling strength needed for vicious snap-downs and front headlocks.", image: "/assets/exercises/weighted_pullup.png" },
      { name: "Barbell Row (Overhand)", description: "Emphasizing the mid-back for hand fighting.", image: "/assets/exercises/barbell_row.png" },
      { name: "Incline Dumbbell Press", description: "Builds chest and front shoulder stability.", image: "/assets/exercises/incline_db_press.png" },
      { name: "Standing Overhead Press", description: "Absolute shoulder strength.", image: "/assets/exercises/overhead_press.png" },
      { name: "4-Way Neck Machine", description: "Heavy neck conditioning.", image: "/assets/exercises/neck_machine.png" },
      { name: "Conventional Deadlifts", description: "Pure posterior chain pulling power.", image: "/assets/exercises/conventional_deadlift.png" },
      { name: "Dumbbell Clean and Press", description: "Explosive full-body transfer.", image: "/assets/exercises/db_clean_press.png" },
      { name: "Face Pulls", description: "Rear delts and rotator cuff health.", image: "/assets/exercises/face_pulls.png" },
      { name: "Dips", description: "Heavy tricep and chest lock-out power.", image: "/assets/exercises/dips.png" },
      { name: "Heavy Fat-Grip Holds", description: "Extreme grip taxation.", image: "/assets/exercises/fat_grip_holds.png" },
      { name: "Box Jumps", description: "Raw explosive vertical power.", image: "/assets/exercises/box_jump.png" }
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
      { name: "Barbell Power Cleans", description: "Pure explosive hip extension. The ultimate wrestling lift.", image: "/assets/exercises/power_clean.png" },
      { name: "Front Squats", description: "Forces immense core and upper back rigidity.", image: "/assets/exercises/front_squat.png" },
      { name: "Glute-Ham Raises (GHR)", description: "Bulletproofs hamstrings against hyperextension.", image: "/assets/exercises/ghr.png" },
      { name: "Cable Woodchoppers", description: "Dynamic rotational resistance.", image: "/assets/exercises/woodchopper.png" },
      { name: "Ab Wheel Rollouts", description: "Extreme anti-extension core strength.", image: "/assets/exercises/ab_wheel.png" },
      { name: "Weighted Chin-ups (Fat Gripz)", description: "Pulling power combined with crushing grip demand.", image: "/assets/exercises/fat_grip_chinup.png" },
      { name: "Heavy DB Bench Press", description: "Independent arm stability under heavy load.", image: "/assets/exercises/heavy_db_bench.png" },
      { name: "Meadows Rows", description: "Unilateral pulling leverage.", image: "/assets/exercises/meadows_row.png" },
      { name: "Z-Press", description: "Seated on floor overhead press. No leg drive allowed, absolute shoulder/core demand.", image: "/assets/exercises/z_press.png" },
      { name: "Wrestler's Bridge (Neck)", description: "Neck isometrics. Front and back bridges, fully controlled.", image: "/assets/exercises/wrestlers_bridge.png" },
      { name: "Deficit Deadlifts", description: "Pulling from a 2-inch block to build raw power off the floor.", image: "/assets/exercises/deficit_deadlift.png" },
      { name: "Sandbag Bear Hug Carries", description: "Mimics squeezing an opponent.", image: "/assets/exercises/sandbag_carry.png" },
      { name: "Heavy Kettlebell Swings", description: "Violent hip snap.", image: "/assets/exercises/kb_swing.png" },
      { name: "Towel Pull-ups", description: "Hang a towel over the bar, grip the cloth, and pull.", image: "/assets/exercises/towel_pullup.png" },
      { name: "Pallof Press", description: "Anti-rotation core stability.", image: "/assets/exercises/pallof_press.png" }
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
