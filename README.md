# Experiment A – Entwicklung mit einem einfachen Prompt

Profilverwaltung für Studierende eines fiktiven Hochschulportals.
Stack: Vue.js 3, TypeScript, Vite, CSS. Entstanden mit genau einem Prompt, ohne Skills oder Agent-Instruktionen.

## Verwendeter Prompt

```
Du bist ein erfahrener Frontend-Entwickler. Erstelle in diesem leeren Repository mit Vue.js 3, TypeScript, Vite und CSS eine lauffähige Profilverwaltungsseite für Studierende eines fiktiven Hochschulportals.

Die Seite soll eine Profilansicht mit persönlichen Angaben (z. B. Name, E-Mail, Telefon, Adresse) und studienbezogenen Informationen (z. B. Matrikelnummer, Studiengang, Semester) enthalten. Die Profildaten sollen bearbeitet und gespeichert werden können. Speichere sie im localStorage, da es kein Backend gibt. Verwende Beispieldaten.

Baue die Anwendung aus klar getrennten, wiederverwendbaren Komponenten ohne doppelte Logik auf. Gestalte eine moderne, gut nutzbare Oberfläche.

Die Seite muss funktionieren und im Browser aufrufbar sein. Installiere alle Abhängigkeiten, führe `npm run build` aus und behebe alle Build- und TypeScript-Fehler, bis der Build fehlerfrei durchläuft. Teile mir am Ende mit, wie ich die App starte und unter welcher URL sie erreichbar ist.
```

## App starten

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Typprüfung (vue-tsc) + Produktionsbuild
npm run preview  # Produktionsbuild lokal ansehen
```

## Projektstruktur

```
src/
├── App.vue                  Seitenaufbau, Aktionen, Toast
├── components/
│   ├── BaseButton.vue       Button (primary/secondary/ghost)
│   ├── FormField.vue        Eingabefeld/Select mit Label und Fehlermeldung
│   ├── InfoItem.vue         Anzeige eines Wertes (Leseansicht)
│   ├── ProfileHeader.vue    Kopfbereich mit Initialen, Name, Matrikelnummer
│   ├── ProfileSection.vue   Karte, rendert Felder aus der Konfiguration
│   └── ToastMessage.vue     Rückmeldung nach Speichern
├── composables/useProfile.ts  Zustand, Bearbeiten/Speichern/Abbrechen, localStorage
├── data/
│   ├── profileSections.ts   Felddefinitionen (Quelle für Ansicht und Formular)
│   └── sampleProfile.ts     Beispieldaten
├── types/profile.ts         Typen
└── utils/validation.ts      Validierung und Formatierung
```

## Funktionen

- Profilansicht mit persönlichen Angaben und Studiendaten
- Bearbeitungsmodus mit Validierung (Pflichtfelder, E-Mail, Telefon, PLZ, Matrikelnummer, Semester)
- Speichern im localStorage (Schlüssel `student-portal:profile`), Daten bleiben nach Neuladen erhalten
- Abbrechen verwirft Änderungen, Zurücksetzen stellt die Beispieldaten wieder her
- Responsives Layout, Tastatur- und Screenreader-Grundlagen (Labels, `aria-invalid`, `role="alert"`)

## Dokumentation

### Screenshot

_(Screenshot der laufenden App unter `docs/screenshot.png` ablegen und hier einbinden:_ `![Profilseite](docs/screenshot.png)`_)_

### Stärken

- Lauffähig nach einem Prompt: Der Build (`vue-tsc` + Vite) läuft fehlerfrei, der Dev-Server liefert die Seite aus.
- Alle geforderten Inhalte sind umgesetzt: Ansicht, Bearbeiten, Speichern im localStorage, Beispieldaten.
- Saubere Trennung: Zustandslogik in einem Composable, Validierung in `utils`, Darstellung in kleinen Komponenten.
- Keine doppelte Logik: Die Felder sind einmal in `profileSections.ts` definiert und erzeugen Leseansicht und Formular.
- Streng typisiert (`strict`), Typen für Profil, Felder und Fehler.
- Moderne, einheitliche Oberfläche über CSS-Variablen, responsiv, mit Fehlermeldungen am Feld und Toast-Rückmeldung.
- Robust gegen kaputten oder nicht verfügbaren localStorage (Fallback auf Beispieldaten).

### Schwächen

- Keine automatisierten Tests (Unit- oder E2E-Tests); die Funktion im Browser wurde nicht automatisiert geprüft.
- Kein Backend, keine Anmeldung: Daten liegen nur im Browser und nicht geräteübergreifend.
- Validierung ist einfach gehalten (z. B. nur 5-stellige deutsche PLZ, keine Prüfung auf echte Adressen).
- Kein Router, keine Mehrsprachigkeit: Texte sind fest auf Deutsch.
- Kein Profilbild-Upload, kein Dark Mode; Barrierefreiheit nur grundlegend umgesetzt, nicht mit Screenreader getestet.
- Zurücksetzen nutzt das native `confirm()`-Fenster statt eines eigenen Dialogs.
- Zeitpunkt der Abhängigkeitswahl: TypeScript musste auf 5.9 festgelegt werden, da `vue-tsc` mit TypeScript 7 nicht läuft.
