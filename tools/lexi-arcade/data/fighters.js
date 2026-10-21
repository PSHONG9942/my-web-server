/**
 * Upgraded Dataset for Syntax Fighter: Expedition Edition
 * 10 Characters x 5 Actions each (50 Action Verbs total)
 * Features AP Costs (1-3 AP), Status Effects, and Combo Synergies
 * inspired by Clair Obscur: Expedition 33.
 */

const FIGHTERS_DATA = [
  {
    id: "kage",
    name: "KAGE",
    title: "The Cyber Ninja",
    theme: "cyber-ninja",
    color: "#00ffcc",
    icon: "🥷",
    bio: "A cybernetically enhanced assassin who strikes from stealth and exploits bleeding wounds.",
    baseHp: 480,
    moves: [
      {
        verb: "Ambush",
        ipa: "/ˈæm.bʊʃ/",
        definition: "To make a sudden surprise attack from a concealed position.",
        type: "setup",
        apCost: 1,
        damage: 40,
        status: "EXPOSED",
        synergyHint: "Inflicts EXPOSED: Target takes +50% damage from the next attack.",
        sfx: "slash"
      },
      {
        verb: "Lacerate",
        ipa: "/ˈlæs.ə.reɪt/",
        definition: "To tear, rip, or make deep, jagged cuts into the opponent.",
        type: "offensive",
        apCost: 2,
        damage: 65,
        status: "BLEEDING",
        synergyHint: "Inflicts BLEEDING: Deals 25 damage per turn for 2 turns.",
        sfx: "slash"
      },
      {
        verb: "Vanish",
        ipa: "/ˈvæn.ɪʃ/",
        definition: "To disappear suddenly, completely, and invisibly from sight.",
        type: "buff",
        apCost: 1,
        damage: 0,
        selfStatus: "STEALTH",
        synergyHint: "Enters STEALTH: Automatically dodges next hit & guarantees next hit is CRITICAL.",
        sfx: "parry"
      },
      {
        verb: "Evade",
        ipa: "/ɪˈveɪd/",
        definition: "To escape, elude, or avoid an incoming attack through agile movement.",
        type: "defensive",
        apCost: 1,
        damage: 25,
        synergyHint: "Grants +50% wider Perfect Parry timing window during next enemy turn.",
        sfx: "parry"
      },
      {
        verb: "Assassinate",
        ipa: "/əˈsæs.ɪ.neɪt/",
        definition: "To murder or neutralize a target with swift, calculated lethality.",
        type: "finisher",
        apCost: 3,
        damage: 85,
        comboMultiplier: 2.6,
        comboCondition: ["BLEEDING", "STEALTH", "EXPOSED"],
        synergyHint: "🔥 LETHAL COMBO: Deals 2.6x DMG (220+ DMG) if target is BLEEDING, EXPOSED, or user is in STEALTH!",
        sfx: "crit"
      }
    ]
  },
  {
    id: "aegis",
    name: "AEGIS",
    title: "The Titan Paladin",
    theme: "titan-paladin",
    color: "#ffd700",
    icon: "🛡️",
    bio: "An ancient juggernaut who fortifies defenses and converts heavy armor into crushing obliteration.",
    baseHp: 620,
    moves: [
      {
        verb: "Fortify",
        ipa: "/ˈfɔː.tɪ.faɪ/",
        definition: "To strengthen, reinforce, and secure defenses against enemy assault.",
        type: "buff",
        apCost: 1,
        damage: 0,
        selfStatus: "FORTIFIED",
        synergyHint: "Grants FORTIFIED: Reduces all incoming damage by 50% for 2 turns.",
        sfx: "parry"
      },
      {
        verb: "Withstand",
        ipa: "/wɪðˈstænd/",
        definition: "To endure, resist, or hold out against great force without buckling.",
        type: "buff",
        apCost: 1,
        damage: 30,
        heal: 45,
        synergyHint: "Heals 45 HP and grants 30 temporary shield.",
        sfx: "parry"
      },
      {
        verb: "Parry",
        ipa: "/ˈpær.i/",
        definition: "To ward off, block, or turn aside an attack with one's weapon or shield.",
        type: "defensive",
        apCost: 1,
        damage: 40,
        selfStatus: "COUNTER_READY",
        synergyHint: "Readies Counter-Stance: Next Perfect Parry reflects 150% damage and refunds 2 AP.",
        sfx: "parry"
      },
      {
        verb: "Repel",
        ipa: "/rɪˈpel/",
        definition: "To drive or force an attacker back by energetic resistance.",
        type: "offensive",
        apCost: 2,
        damage: 65,
        dispel: true,
        synergyHint: "Removes all positive buffs from the enemy and inflicts STAGGER.",
        sfx: "hit"
      },
      {
        verb: "Obliterate",
        ipa: "/əˈblɪt.ə.reɪt/",
        definition: "To destroy utterly, erase, and wipe out all traces of the opponent.",
        type: "finisher",
        apCost: 3,
        damage: 90,
        comboMultiplier: 2.5,
        comboCondition: ["FORTIFIED"],
        synergyHint: "🔥 TITAN COMBO: Deals 2.5x DMG (225+ DMG) if Aegis is FORTIFIED!",
        sfx: "crit"
      }
    ]
  },
  {
    id: "ignis",
    name: "IGNIS",
    title: "Inferno Pyromancer",
    theme: "inferno-pyro",
    color: "#ff3b00",
    icon: "🔥",
    bio: "A firebrand channeler who layers scorch embers, triggering catastrophic combustions.",
    baseHp: 460,
    moves: [
      {
        verb: "Ignite",
        ipa: "/ɪɡˈnaɪt/",
        definition: "To cause to begin burning; to spark a sudden flame.",
        type: "setup",
        apCost: 1,
        damage: 35,
        status: "SCORCHED",
        synergyHint: "Inflicts SCORCHED: Burns target for 20 damage each turn.",
        sfx: "slash"
      },
      {
        verb: "Scorch",
        ipa: "/skɔːtʃ/",
        definition: "To burn the surface of something severely with intense heat.",
        type: "offensive",
        apCost: 1,
        damage: 45,
        status: "SCORCHED",
        synergyHint: "Applies SCORCHED and lowers enemy attack power by 25%.",
        sfx: "hit"
      },
      {
        verb: "Combust",
        ipa: "/kəmˈbʌst/",
        definition: "To catch fire, burst into flames, and burn vigorously.",
        type: "offensive",
        apCost: 2,
        damage: 75,
        comboMultiplier: 1.8,
        comboCondition: ["SCORCHED"],
        synergyHint: "Deals +80% bonus damage if target is already SCORCHED.",
        sfx: "hit"
      },
      {
        verb: "Detonate",
        ipa: "/ˈdet.ən.eɪt/",
        definition: "To explode or trigger a sudden, violent concussive blast.",
        type: "offensive",
        apCost: 2,
        damage: 80,
        status: "EXPOSED",
        synergyHint: "Blasts enemy defense away, leaving them EXPOSED (+50% dmg taken).",
        sfx: "crit"
      },
      {
        verb: "Incinerate",
        ipa: "/ɪnˈsɪn.ər.eɪt/",
        definition: "To burn completely to ashes with intense, unyielding heat.",
        type: "finisher",
        apCost: 3,
        damage: 95,
        comboMultiplier: 2.5,
        comboCondition: ["SCORCHED"],
        synergyHint: "🔥 SUPERNOVA COMBO: Deals 2.5x DMG (240+ DMG) if target is SCORCHED!",
        sfx: "crit"
      }
    ]
  },
  {
    id: "glacia",
    name: "GLACIA",
    title: "The Frost Duchess",
    theme: "frost-duchess",
    color: "#67e8f9",
    icon: "❄️",
    bio: "Sovereign of absolute zero who locks enemies in permafrost, shattering brittle ice.",
    baseHp: 520,
    moves: [
      {
        verb: "Immobilize",
        ipa: "/ɪˈməʊ.bɪ.laɪz/",
        definition: "To prevent someone or something from moving; to lock completely in place.",
        type: "setup",
        apCost: 1,
        damage: 35,
        status: "FROZEN",
        synergyHint: "Inflicts FROZEN: Target loses 1 AP on their next turn.",
        sfx: "stun"
      },
      {
        verb: "Congeal",
        ipa: "/kənˈdʒiːl/",
        definition: "To change from a fluid to a solid state, especially by freezing.",
        type: "buff",
        apCost: 1,
        damage: 25,
        selfStatus: "ICE_ARMOR",
        synergyHint: "Erects ICE ARMOR: Absorbs up to 60 damage.",
        sfx: "parry"
      },
      {
        verb: "Subdue",
        ipa: "/səbˈdʒuː/",
        definition: "To overcome, bring under quiet control, or conquer through cool force.",
        type: "offensive",
        apCost: 2,
        damage: 60,
        status: "EXPOSED",
        synergyHint: "Pacifies target aggression and inflicts EXPOSED.",
        sfx: "hit"
      },
      {
        verb: "Crystallize",
        ipa: "/ˈkrɪs.təl.aɪz/",
        definition: "To form into crystals or take a clear, definite, rigid crystalline structure.",
        type: "setup",
        apCost: 2,
        damage: 70,
        status: "FROZEN",
        synergyHint: "Encases enemy in solid crystal permafrost.",
        sfx: "crit"
      },
      {
        verb: "Shatter",
        ipa: "/ˈʃæt.ər/",
        definition: "To break suddenly and violently into hundreds of tiny sharp pieces.",
        type: "finisher",
        apCost: 3,
        damage: 85,
        comboMultiplier: 2.8,
        comboCondition: ["FROZEN"],
        synergyHint: "🔥 GLACIAL COMBO: Deals 2.8x DMG (240+ DMG) if target is FROZEN!",
        sfx: "slash"
      }
    ]
  },
  {
    id: "toxin",
    name: "TOXIN",
    title: "The Plague Alchemist",
    theme: "plague-alchemist",
    color: "#22c55e",
    icon: "🧪",
    bio: "A biochemical saboteur who corrupts armor and siphons life from diseased foes.",
    baseHp: 510,
    moves: [
      {
        verb: "Contaminate",
        ipa: "/kənˈtæm.ɪ.neɪt/",
        definition: "To make something impure, poisonous, or diseased by chemical contact.",
        type: "setup",
        apCost: 1,
        damage: 35,
        status: "POISONED",
        synergyHint: "Inflicts POISONED: Deals 25 damage per turn for 3 turns.",
        sfx: "hit"
      },
      {
        verb: "Corrode",
        ipa: "/kəˈrəʊd/",
        definition: "To eat away, rust, or destroy gradually by chemical reaction.",
        type: "offensive",
        apCost: 2,
        damage: 60,
        status: "CORRODED",
        synergyHint: "Inflicts CORRODED: Target loses 50% armor resistance.",
        sfx: "slash"
      },
      {
        verb: "Debilitate",
        ipa: "/dɪˈbɪl.ɪ.teɪt/",
        definition: "To make weak, feeble, or impair the bodily strength of someone.",
        type: "debuff",
        apCost: 1,
        damage: 30,
        status: "WEAKENED",
        synergyHint: "Inflicts WEAKENED: Enemy deals 35% less damage.",
        sfx: "stun"
      },
      {
        verb: "Siphon",
        ipa: "/ˈsaɪ.fən/",
        definition: "To draw off, extract, or drain liquid or life-force from a source.",
        type: "offensive",
        apCost: 2,
        damage: 65,
        vampiric: true,
        comboCondition: ["POISONED"],
        synergyHint: "Lifesteal: Heals Toxin for 100% of damage dealt if target is POISONED!",
        sfx: "hit"
      },
      {
        verb: "Eradicate",
        ipa: "/ɪˈræd.ɪ.keɪt/",
        definition: "To destroy completely, eliminate at the roots, and leave zero survivors.",
        type: "finisher",
        apCost: 3,
        damage: 90,
        comboMultiplier: 2.6,
        comboCondition: ["POISONED", "CORRODED"],
        synergyHint: "🔥 PANDEMIC COMBO: Deals 2.6x DMG (230+ DMG) if target is POISONED or CORRODED!",
        sfx: "crit"
      }
    ]
  },
  {
    id: "volt",
    name: "VOLT",
    title: "The Pulse Brawler",
    theme: "pulse-brawler",
    color: "#eab308",
    icon: "⚡",
    bio: "A kinetic conduit who stores massive electrical voltage and releases concussive shocks.",
    baseHp: 500,
    moves: [
      {
        verb: "Overcharge",
        ipa: "/ˌəʊ.vəˈtʃɑːdʒ/",
        definition: "To charge beyond normal capacity with dangerous levels of electric power.",
        type: "buff",
        apCost: 1,
        damage: 0,
        selfStatus: "OVERCHARGED",
        synergyHint: "Grants OVERCHARGED: Generates +2 AP immediately and boosts next attack by 40%.",
        sfx: "hit"
      },
      {
        verb: "Electrocute",
        ipa: "/ɪˈlek.trə.kjuːt/",
        definition: "To injure, stun, or kill by passing electric current through the body.",
        type: "offensive",
        apCost: 2,
        damage: 70,
        status: "SHOCKED",
        synergyHint: "Inflicts SHOCKED: Target suffers interruption on their next move.",
        sfx: "hit"
      },
      {
        verb: "Discharge",
        ipa: "/dɪsˈtʃɑːdʒ/",
        definition: "To release or let out an explosive store of accumulated electricity or force.",
        type: "offensive",
        apCost: 2,
        damage: 75,
        comboMultiplier: 1.8,
        comboCondition: ["OVERCHARGED"],
        synergyHint: "Releases stored energy: Deals +80% damage if Volt is OVERCHARGED.",
        sfx: "crit"
      },
      {
        verb: "Discombobulate",
        ipa: "/ˌdɪs.kəmˈbɒb.jə.leɪt/",
        definition: "To thoroughly confuse, upset, disconcert, or disorient someone's senses.",
        type: "debuff",
        apCost: 1,
        damage: 35,
        status: "DISORIENTED",
        synergyHint: "Inflicts DISORIENTED: Enemy attack misses with a 50% chance.",
        sfx: "stun"
      },
      {
        verb: "Pulverize",
        ipa: "/ˈpʌl.vər.aɪz/",
        definition: "To reduce to fine dust or powder by crushing, beating, or grinding.",
        type: "finisher",
        apCost: 3,
        damage: 95,
        comboMultiplier: 2.5,
        comboCondition: ["SHOCKED", "DISORIENTED"],
        synergyHint: "🔥 THUNDER COMBO: Deals 2.5x DMG (240+ DMG) if target is SHOCKED or DISORIENTED!",
        sfx: "crit"
      }
    ]
  },
  {
    id: "zephyr",
    name: "ZEPHYR",
    title: "The Sky Acrobat",
    theme: "sky-acrobat",
    color: "#00e1ff",
    icon: "🌪️",
    bio: "Master of aerodynamic vortexes who outmaneuvers threats and catapults targets into gales.",
    baseHp: 470,
    moves: [
      {
        verb: "Accelerate",
        ipa: "/əkˈsel.ə.reɪt/",
        definition: "To increase speed, move faster, or cause momentum to surge.",
        type: "buff",
        apCost: 1,
        damage: 25,
        selfStatus: "ACCELERATED",
        synergyHint: "Gains ACCELERATED: Doubles Dodge window and grants +1 AP next turn.",
        sfx: "hit"
      },
      {
        verb: "Deflect",
        ipa: "/dɪˈflekt/",
        definition: "To cause an oncoming projectile or attack to deviate from its path.",
        type: "defensive",
        apCost: 1,
        damage: 35,
        synergyHint: "Prepares deflection gale: Completely redirects the next attack back to enemy.",
        sfx: "parry"
      },
      {
        verb: "Outmaneuver",
        ipa: "/ˌaʊt.məˈnuː.vər/",
        definition: "To gain tactical advantage over someone by superior agility and cunning.",
        type: "offensive",
        apCost: 2,
        damage: 65,
        status: "EXPOSED",
        synergyHint: "Flanks behind enemy, removing their shields and inflicting EXPOSED.",
        sfx: "slash"
      },
      {
        verb: "Soar",
        ipa: "/sɔːr/",
        definition: "To fly or rise high into the air with grace and effortless power.",
        type: "buff",
        apCost: 1,
        damage: 0,
        selfStatus: "AIRBORNE",
        synergyHint: "Leaps AIRBORNE: Immune to all ground attacks for 1 turn.",
        sfx: "slash"
      },
      {
        verb: "Catapult",
        ipa: "/ˈkæt.ə.pʌlt/",
        definition: "To launch, hurl, or propel someone or something with immense force.",
        type: "finisher",
        apCost: 3,
        damage: 90,
        comboMultiplier: 2.6,
        comboCondition: ["AIRBORNE", "EXPOSED"],
        synergyHint: "🔥 CYCLONE COMBO: Deals 2.6x DMG (230+ DMG) while AIRBORNE or if foe is EXPOSED!",
        sfx: "crit"
      }
    ]
  },
  {
    id: "chrono",
    name: "CHRONO",
    title: "The Temporal Mage",
    theme: "temporal-mage",
    color: "#a855f7",
    icon: "⏳",
    bio: "An architect of time causality who reverses wounds and preempts future actions.",
    baseHp: 500,
    moves: [
      {
        verb: "Decelerate",
        ipa: "/diːˈsel.ə.reɪt/",
        definition: "To reduce speed, slow down, or brake the velocity of an object or enemy.",
        type: "setup",
        apCost: 1,
        damage: 30,
        status: "STAGNATED",
        synergyHint: "Inflicts STAGNATED: Enemy attack wind-up time is slowed by 50% (easier to parry).",
        sfx: "stun"
      },
      {
        verb: "Rewind",
        ipa: "/riːˈwaɪnd/",
        definition: "To reverse the sequence of events back to an earlier point in time.",
        type: "buff",
        apCost: 2,
        damage: 0,
        heal: 70,
        synergyHint: "Rewinds time: Restores 70 HP and purges all negative status debuffs.",
        sfx: "parry"
      },
      {
        verb: "Anticipate",
        ipa: "/ænˈtɪs.ɪ.peɪt/",
        definition: "To foresee, expect, and prepare for an event or attack before it happens.",
        type: "buff",
        apCost: 1,
        damage: 25,
        selfStatus: "FORESIGHT",
        synergyHint: "Grants FORESIGHT: Reveals exact enemy attack and doubles Perfect Parry window.",
        sfx: "parry"
      },
      {
        verb: "Stagnate",
        ipa: "/ˈstæɡ.neɪt/",
        definition: "To stop developing, flowing, or moving; to enter a dead halt.",
        type: "debuff",
        apCost: 2,
        damage: 55,
        status: "STAGNATED",
        synergyHint: "Locks target in temporal stasis, freezing their AP gain.",
        sfx: "stun"
      },
      {
        verb: "Preempt",
        ipa: "/priˈempt/",
        definition: "To act beforehand in order to prevent an anticipated occurrence.",
        type: "finisher",
        apCost: 3,
        damage: 90,
        comboMultiplier: 2.6,
        comboCondition: ["FORESIGHT", "STAGNATED"],
        synergyHint: "🔥 CHRONO COMBO: Deals 2.6x DMG (230+ DMG) if Chrono has FORESIGHT or foe is STAGNATED!",
        sfx: "crit"
      }
    ]
  },
  {
    id: "umbra",
    name: "UMBRA",
    title: "The Shadow Phantom",
    theme: "shadow-phantom",
    color: "#818cf8",
    icon: "👻",
    bio: "An ethereal specter who haunts thoughts and suffocates targets in the dark.",
    baseHp: 470,
    moves: [
      {
        verb: "Haunt",
        ipa: "/hɔːnt/",
        definition: "To manifest persistently, disturb mentally, or visit as a phantom presence.",
        type: "setup",
        apCost: 1,
        damage: 35,
        status: "HAUNTED",
        synergyHint: "Inflicts HAUNTED: Target takes 20 psychic damage each turn.",
        sfx: "hit"
      },
      {
        verb: "Infiltrate",
        ipa: "/ˈɪn.fɪl.treɪt/",
        definition: "To enter or gain access secretly, gradually, and stealthily through barriers.",
        type: "offensive",
        apCost: 2,
        damage: 60,
        pierce: true,
        synergyHint: "Piercing hit: Completely ignores all enemy shields and armor.",
        sfx: "slash"
      },
      {
        verb: "Extinguish",
        ipa: "/ɪkˈstɪŋ.ɡwɪʃ/",
        definition: "To put out, smother, quell, or bring an end to a flame or light.",
        type: "debuff",
        apCost: 1,
        damage: 40,
        dispel: true,
        synergyHint: "Snuffs out energy: Dispels enemy buffs and dims enemy vision.",
        sfx: "hit"
      },
      {
        verb: "Suffocate",
        ipa: "/ˈsʌf.ə.keɪt/",
        definition: "To die or cause to choke from lack of air, breath, or oxygen.",
        type: "debuff",
        apCost: 2,
        damage: 65,
        status: "EXPOSED",
        synergyHint: "Chokes enemy airflow, inflicting EXPOSED (+50% dmg taken).",
        sfx: "stun"
      },
      {
        verb: "Disintegrate",
        ipa: "/dɪsˈɪn.tɪ.ɡreɪt/",
        definition: "To break up, decompose, or decay into small microscopic particles.",
        type: "finisher",
        apCost: 3,
        damage: 95,
        comboMultiplier: 2.6,
        comboCondition: ["HAUNTED", "EXPOSED"],
        synergyHint: "🔥 VOID COMBO: Deals 2.6x DMG (245+ DMG) if target is HAUNTED or EXPOSED!",
        sfx: "crit"
      }
    ]
  },
  {
    id: "aura",
    name: "AURA",
    title: "The Mystic Warden",
    theme: "mystic-warden",
    color: "#ec4899",
    icon: "✨",
    bio: "Luminous warden of celestial resonance who heals injuries and transmutes damage.",
    baseHp: 540,
    moves: [
      {
        verb: "Illuminate",
        ipa: "/ɪˈluː.mɪ.neɪt/",
        definition: "To light up, make clear, or brighten with radiant clarity.",
        type: "setup",
        apCost: 1,
        damage: 35,
        status: "ILLUMINATED",
        synergyHint: "Inflicts ILLUMINATED: Reveals weak points, boosting all critical hit rates by 35%.",
        sfx: "slash"
      },
      {
        verb: "Rejuvenate",
        ipa: "/rɪˈdʒuː.vən.eɪt/",
        definition: "To make fresh, vigorous, or youthful again; to restore vital vigor.",
        type: "buff",
        apCost: 2,
        damage: 0,
        heal: 75,
        synergyHint: "Restores 75 HP and grants 1 bonus AP.",
        sfx: "parry"
      },
      {
        verb: "Transmute",
        ipa: "/trænzˈmjuːt/",
        definition: "To change or convert something into a completely different form or state.",
        type: "defensive",
        apCost: 1,
        damage: 35,
        selfStatus: "TRANSMUTED",
        synergyHint: "Transmutes incoming damage: Converts next hit taken directly into HP healing!",
        sfx: "crit"
      },
      {
        verb: "Enthrall",
        ipa: "/ɪnˈθrɔːl/",
        definition: "To capture the fascinated attention of; to hold completely spellbound.",
        type: "debuff",
        apCost: 2,
        damage: 55,
        status: "ENTHRALLED",
        synergyHint: "Charms the enemy: Enemy's next attack deals 50% less damage.",
        sfx: "stun"
      },
      {
        verb: "Harmonize",
        ipa: "/ˈhɑː.mə.naɪz/",
        definition: "To bring into balance, accord, and peaceful concordant agreement.",
        type: "finisher",
        apCost: 3,
        damage: 90,
        comboMultiplier: 2.7,
        comboCondition: ["ILLUMINATED", "ENTHRALLED"],
        synergyHint: "🔥 CELESTIAL COMBO: Deals 2.7x DMG (240+ DMG) if target is ILLUMINATED or ENTHRALLED!",
        sfx: "crit"
      }
    ]
  }
];

const ADVERB_MODIFIERS = [
  { adverb: "Swiftly", boost: "ap", desc: "Refunds 1 AP upon hit", critChance: 0.15 },
  { adverb: "Relentlessly", boost: "combo", desc: "+2 Hit Multistrike", critChance: 0.25 },
  { adverb: "Fiercely", boost: "damage", desc: "+35% Raw Damage", critChance: 0.35 },
  { adverb: "Tactically", boost: "pierce", desc: "Ignores 50% Armor & Shields", critChance: 0.20 },
  { adverb: "Ruthlessly", boost: "crit", desc: "+50% Critical Blast", critChance: 0.45 },
  { adverb: "Defiantly", boost: "shield", desc: "Grants +35 Temporary Shield", critChance: 0.10 }
];

if (typeof window !== "undefined") {
  window.FIGHTERS_DATA = FIGHTERS_DATA;
  window.ADVERB_MODIFIERS = ADVERB_MODIFIERS;
}
