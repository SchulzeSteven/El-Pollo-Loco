# 🐔 El Pollo Loco – 2D Jump'n'Run Game

**El Pollo Loco** ist ein spaßiges, actionreiches 2D-Jump'n'Run-Spiel, das vollständig mit **JavaScript**, **HTML5 Canvas** und **objektorientierter Programmierung** entwickelt wurde. Ziel ist es, eine Farm von verrückten Hühnern zu befreien, indem du Flaschen wirfst, Coins sammelst und den Endboss besiegst!

---

## 🎮 Features

- 👨‍🌾 **Charakter mit Bewegungsanimation**
  - Springen, Laufen, Werfen
  - Mobile Steuerung (Touch Buttons)
  - Tastatursteuerung mit WASD oder Pfeiltasten

- 🐔 **Gegner**
  - Kleine & große Chickens
  - Bewegliche Hitboxen, Animationen, Kollisionen
  - Endboss mit mehreren Phasen & Lebenspunkten

- 🧠 **Game-Logik**
  - Leben, Münzen und Flaschen mit Statusleisten
  - Gravity, Treffererkennung, Spielende mit Game-Over- oder Win-Screen
  - Flaschen als Wurfobjekte gegen Gegner

- 🌄 **Level & Umgebung**
  - Mehrschichtiger Parallax-Hintergrund
  - Wolken & Hintergrundobjekte bewegen sich abhängig vom Spieler
  - Coins und Flaschen zufällig verteilt

- 🔊 **Audio**
  - Musik, Soundeffekte (Treffer, Sieg, Game Over)
  - Mute-Button für Musik & SFX

---

## 🧱 Technologien

- HTML5 + Canvas für Grafikdarstellung
- CSS3 für Styling
- JavaScript (OOP, ES6+)
- Klassen wie `Character`, `Chicken`, `Endboss`, `Level`, `World`, `MoveableObject`, `StatusBar`, `Coin`, `Bottle` u. v. m.

---

## 📁 Projektstruktur (Auszug)

```
├── index.html
├── game.js
├── level1.js
├── classes/
│   ├── character.class.js
│   ├── world.class.js
│   ├── level.class.js
│   ├── moveable-object.class.js
│   ├── drawable-object.class.js
│   ├── status-bar.class.js
│   ├── throwable-object.class.js
│   ├── chicken-small.class.js
│   ├── endboss.class.js
│   ├── coin.class.js
│   └── ...
```