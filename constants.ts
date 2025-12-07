
import { CourseModule, BlockType } from './types';

export const COURSE_CONTENT: CourseModule[] = [
  {
    id: 'part-1',
    title: 'Part 1: BIM Automation Basics',
    description: 'Start your journey into automating BIM workflows with Python. Learn the syntax, variables, and data types essential for Revit, Rhino, and BlenderBIM.',
    sections: [
      {
        id: '1-concepts',
        title: '1. Concepts & Setup',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `
### 1.1 Programming Terminologies
Just like construction has its own language (Slab, Elevation, HVAC, Topography), programming has its own vocabulary. Mastering these terms is the first step to becoming a BIM Developer.

*   **Syntax:** The grammar rules of the language. In Python, indentation (whitespace) is crucial. It defines which block of code belongs to a function or loop.
*   **Variable:** A named container to store data. Think of it like a label on a box. "Door Count" is the label, and "50" is what's inside.
*   **Algorithm:** A step-by-step procedure to solve a problem. In construction, this is analogous to a "Method Statement" or "SOP" (Standard Operating Procedure).
*   **Bug:** An error in the code that produces incorrect or unexpected results. Similar to a "clash" in a BIM model that needs coordination to fix.

### 1.2 Using Comments (#)
One of the most important habits to form early is **Commenting**. 
*   In Python, any line starting with a hash symbol \`#\` is ignored by the computer.
*   It is meant for humans (you and your colleagues) to read.
*   Use comments to explain *why* you are doing something complex.
`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# This is a full-line comment
# The computer ignores this completely.

print("Hello Revit") # This is an inline comment

# You can also use comments to disable code temporarily
# print("This line will not run")`
          },
          {
            type: BlockType.MARKDOWN,
            content: `### 1.3 Why Scripting Using Python?
Python has become the *lingua franca* of the AEC (Architecture, Engineering, Construction) industry.

*   **Simplicity:** It is designed to be readable. \`if wall.height > 3000: print("Too High")\` reads almost like English.
*   **Interoperability:** It is the primary scripting engine for:
    *   **Revit** (via PyRevit or Dynamo)
    *   **Rhino** (via RhinoPython or Grasshopper)
    *   **BlenderBIM** (Native)
    *   **Tekla Structures** (via API extensions)
*   **Automation:** Replace repetitive manual tasks (e.g., renaming 1000 sheets, creating views for every room, exporting PDF sets) with a single click, saving hundreds of hours.

### 1.4 Interpreter vs. Compiler
Understanding how Python runs helps you debug errors.
*   **Compiled Languages (e.g., C++, C#):** The entire code manual is translated into machine code *before* execution. It's like submitting a full set of construction drawings for approval before laying a single brick. If one page has an error, the whole set is rejected.
*   **Interpreted Languages (e.g., Python):** The code is translated line-by-line during execution. It's like having a translator on-site giving instructions to the workers in real-time. If there is an error on Step 5, the work stops there immediately. This makes learning and debugging much faster and interactive.
            `,
            visualPrompt: "A simple 2D diagram comparing two processes. Top row 'Compiler': A thick document arrow pointing to a factory, then to a building. Bottom row 'Interpreter': A person speaking into a megaphone, arrow pointing to a worker laying one brick at a time. Style: Flat vector illustration, clean lines, no 3D, blueprint colors."
          },
          {
            type: BlockType.QUIZ,
            content: "Which statement best describes an 'Interpreted' language like Python?",
            options: [
              "It converts the entire code to machine language before running.",
              "It runs the code line-by-line, stopping immediately if it finds an error.",
              "It requires a compiler to build an .exe file first.",
              "It ignores indentation and syntax rules."
            ],
            correctAnswerIndex: 1,
            explanation: "Correct! Python is interpreted, meaning it executes instructions one by one. This is great for learning because you see errors immediately as they happen."
          },
          {
            type: BlockType.MARKDOWN,
            content: `### 1.5 Setting Up Your Workshop
To write Python, you need an engine and a workspace.
*   **Python:** The engine that runs the code.
*   **IDE (Integrated Development Environment):** This is your digital workshop (like Revit is for models).
*   **VS Code (Visual Studio Code):** The industry-standard IDE. It provides color-coding, auto-complete (IntelliSense), and error checking.

### 1.6 Installation Guide (Windows)
To start developing on your own machine (outside this website), follow these exact steps to set up your professional environment.

#### Step 1: Install Python
1.  Go to the official [Python Downloads](https://www.python.org/downloads/) page.
2.  Download the latest version (e.g., 3.12+).
3.  **CRITICAL:** Run the installer and **check the box "Add Python to PATH"** at the bottom.
    *   *Why?* This allows you to run python from the Command Prompt. If you miss this, you will have specific configuration headaches later.
4.  Click "Install Now".

#### Step 2: Install VS Code
1.  Go to [code.visualstudio.com](https://code.visualstudio.com/).
2.  Download the "Windows" installer.
3.  Run the installer and click "Next" until finished (defaults are fine).

#### Step 3: Connect Them
1.  Open VS Code.
2.  Click the **Extensions** icon on the left sidebar (looks like Tetris blocks).
3.  Search for **"Python"** (published by Microsoft).
4.  Click **Install**.
5.  Restart VS Code. Now you are ready to create a new file ending in \`.py\` and run it!
`
          }
        ]
      },
      {
        id: '2-first-script',
        title: '2. Your First Script',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `Let's start coding. In Python, the \`print()\` function is your best friend. It displays output to the console (the text screen). You will use this constantly to check the values of your variables and debug your logic.`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# The traditional first code
print("Hello World")

# Printing a number
print(2024)

# A BIM context example
print("Revit Model Loaded Successfully")
print("Warning: 5 Clashes detected on Level 3")`,
            visualPrompt: "A simple 2D vector illustration of a computer terminal window. Inside the black rectangle, green text says 'Hello World'. No 3D, flat design, minimal style."
          },
          {
             type: BlockType.MARKDOWN,
             content: `### 2.2 Syntax: The Rules of the Road
Python is famous for being readable, but it is strict about grammar (Syntax). A single missing space or colon can crash your script.

#### Rule 1: Case Sensitivity
Python distinguishes between uppercase and lowercase.
*   \`print\` is a valid command.
*   \`Print\` is undefined (Error).
*   \`Wall\` is different from \`wall\`.

#### Rule 2: Indentation
Most languages use curly brackets \`{}\` to group code. Python uses **Indentation** (Whitespace/Tabs).
*   Everything inside a loop or an \`if\` statement must be indented (usually 4 spaces).

#### Rule 3: The Colon
Statements that start a block (\`if\`, \`else\`, \`for\`, \`def\`) must end with a colon \`:\`.`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            title: "Syntax: Correct vs. Wrong",
            content: `# --- WRONG SYNTAX (Will Crash) ---
# Print("Hello")        <-- Error 1: Case mismatch (Use 'print')
# if 5 > 2              <-- Error 2: Missing colon ':'
# print("Bigger")   <-- Error 3: Missing indentation

# --- CORRECT SYNTAX ---
print("Hello")          # Lowercase function name

if 5 > 2:               # Ends with colon
    print("Bigger")     # Indented (4 spaces)
    print("Inside block")

print("Outside block")  # No indentation = Outside the if-statement`
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-1',
            title: 'Exercise 1: Project Setup',
            content: `Write a Python script that acts as a startup log for your automation tool.
1. Print a welcome message: "Starting BIM Automation Tool..."
2. Print your specific discipline (e.g., "Discipline: Structural Engineering").
3. Print a status check: "Status: Ready".`,
            prefill: `# Write your print statements below:\n`,
            hint: 'Use print("Text here") for each line.',
            solution: 'print("Starting BIM Automation Tool...")\nprint("Discipline: Structural Engineering")\nprint("Status: Ready")'
          },
          {
            type: BlockType.QUIZ,
            content: "What is the primary function used to display text on the screen in Python?",
            options: [
              "echo()",
              "console.log()",
              "print()",
              "display()"
            ],
            correctAnswerIndex: 2,
            explanation: "print() is the standard Python function to output data to the console."
          }
        ]
      },
      {
        id: '3-variables',
        title: '3. Variables',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `Variables are fundamental. They are named containers used to store data values. In BIM, you rarely use hard-coded numbers (magic numbers); you use variables so you can easily change parameters later, just like Global Parameters in Revit.`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# Defining project parameters
project_name = "Tower A"
floor_count = 45
typical_floor_height = 3.5

# Calculating building height using variables
total_height = floor_count * typical_floor_height

print(f"Project: {project_name}")
print(f"Total Height: {total_height} meters")

# Updating a variable
floor_count = 50 # Design change!
total_height = floor_count * typical_floor_height
print(f"New Total Height: {total_height} meters")`,
            visualPrompt: "A simple 2D diagram. A box labeled 'Variable' with an open top. An arrow points into it labeled 'Value'. Another arrow comes out labeled 'Data'. Style: Flat infographic, clean lines, no 3D."
          },
          {
            type: BlockType.MARKDOWN,
            content: `### 3.1 Variable Naming Conventions
To write professional "Pythonic" code, you must follow naming rules:
*   **Snake Case:** Use lowercase letters and underscores.
    *   ✅ \`wall_height\` (Correct)
    *   ❌ \`WallHeight\` (This is CamelCase, usually reserved for Classes)
    *   ❌ \`wall height\` (Spaces are not allowed)
*   **Descriptive:** Variables should explain what they hold.
    *   ✅ \`door_count\`
    *   ❌ \`x\` or \`d_c\``
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-2',
            title: 'Exercise 2: Element Properties',
            content: `Let's simulate defining a Wall element in code.
1. Create a variable \`wall_type\` and set it to "Generic - 200mm".
2. Create a variable \`wall_id\` and set it to 101 (an integer).
3. Create a variable \`is_load_bearing\` and set it to \`True\`.
4. Print the \`wall_type\`.`,
            prefill: `# Define your variables here:\n\n# Print the result:\n`,
            hint: 'Remember: variable_name = value. Strings need quotes " ", numbers do not.',
            solution: 'wall_type = "Generic - 200mm"\nwall_id = 101\nis_load_bearing = True\nprint(wall_type)'
          },
          {
            type: BlockType.QUIZ,
            content: "Which of the following is a valid and recommended variable name in Python?",
            options: [
              "FloorHeight",
              "floor height",
              "floor_height",
              "1_floor_height"
            ],
            correctAnswerIndex: 2,
            explanation: "Python uses 'snake_case' (lowercase with underscores) for variables. Variable names cannot start with a number or contain spaces."
          }
        ]
      },
      {
        id: '4-types',
        title: '4. Built-in Data Types',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `Python is "dynamically typed", meaning it figures out the data type automatically. However, knowing your types is critical because different types behave differently.

| Type | Name | BIM Example | Description |
| :--- | :--- | :--- | :--- |
| Text | **String (str)** | \`"Level 1"\` | Any text inside quotes. Used for Names, IDs, Sheet Numbers. |
| Whole Number | **Integer (int)** | \`15\` | Countable items like Doors, Sheets, Days. No decimals. |
| Decimal | **Float (float)** | \`35.5\` | Measurements like Area, Length, Volume, Coordinate Points. |
| Logic | **Boolean (bool)** | \`True\` | Yes/No parameters. Is Load Bearing? Is Demolished? |
            `,
            visualPrompt: "Four simple 2D flat icons arranged in a grid. 1. A speech bubble (String). 2. A block with number 123 (Integer). 3. A ruler (Float). 4. A toggle switch (Boolean). Style: Minimalist flat design, solid colors."
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `level_name = "Ground Floor"  # String
num_columns = 12             # Integer
beam_length = 4.5            # Float
is_external = True           # Boolean

# The type() function tells us what kind of data we have
print(type(level_name))
print(type(num_columns))
print(type(beam_length))
print(type(is_external))

# Common Error: Adding different types
# print("Level " + 1)  <-- This causes a TypeError because you can't add Text to Number directly.`
          },
          {
            type: BlockType.QUIZ,
            content: "What is the data type of the value 3.5?",
            options: [
              "Integer",
              "Float",
              "String",
              "Boolean"
            ],
            correctAnswerIndex: 1,
            explanation: "Numbers with decimal points are called Floats (Floating Point Numbers)."
          }
        ]
      },
      {
        id: '6-math',
        title: '5. Numbers & Math',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `BIM is all about geometry and quantification. You will use math to calculate areas, volumes, cost estimates, and coordinates. Python supports all standard arithmetic operations.`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# Dimensions in meters
length = 5.0
width = 4.0
height = 3.0

# Basic Math
floor_area = length * width
room_volume = floor_area * height
perimeter = 2 * (length + width)

print(f"Area: {floor_area} m2")
print(f"Volume: {room_volume} m3")
print(f"Perimeter: {perimeter} m")

# Exponents (Powers)
# useful for converting units or geometry formulas
radius = 1.5
circle_area = 3.14159 * (radius ** 2) 
print(f"Circle Area: {circle_area}")`
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-3',
            title: 'Exercise 3: Concrete Takeoff',
            content: `Calculate the volume of concrete required for a slab.
1. Define a variable \`slab_area\` with value 150.5.
2. Define a variable \`thickness\` with value 0.25.
3. Calculate \`volume\` by multiplying area and thickness.
4. Define \`waste_factor\` as 1.05 (5% waste).
5. Calculate \`total_order_volume\` = volume * waste_factor.
6. Print the total volume to order.`,
            prefill: `# Write your calculation script:\n`,
            solution: 'slab_area = 150.5\nthickness = 0.25\nvolume = slab_area * thickness\nwaste_factor = 1.05\ntotal_order_volume = volume * waste_factor\nprint(total_order_volume)'
          },
          {
            type: BlockType.QUIZ,
            content: "Which operator is used for exponentiation (power of) in Python?",
            options: [
              "^",
              "**",
              "pow",
              "^^"
            ],
            correctAnswerIndex: 1,
            explanation: "Python uses double asterisks (**) for powers. e.g., 2**3 = 8."
          }
        ]
      },
      {
        id: '7-casting',
        title: '6. Type Conversion (Casting)',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `**Critical for BIM Automation:** When you read data from external sources like Excel, CSV files, or even some Revit parameters, numbers often come in as **Text (Strings)**.

If you try to do math on text, Python will either error out or do something unexpected (like concatenation). You must "Cast" (convert) them to the correct number type first.`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# SCENARIO: Reading data from a CSV file
data_input = "5000" 

# MISTAKE: Treating string like a number
# result = data_input + 500  
# Output Error: can only concatenate str (not "int") to str

# SOLUTION: Casting
# Convert string to integer
wall_length = int(data_input)

# Now we can do math
total_length = wall_length + 500
print(f"Original: {data_input} (Type: {type(data_input)})")
print(f"Converted: {wall_length} (Type: {type(wall_length)})")
print(f"New Length: {total_length}")

# Casting to String is also useful for combining messages
print("The total length is " + str(total_length) + " mm")`
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-4',
            title: 'Exercise 4: Cleaning Input Data',
            content: `You have received a parameter value from a dirty dataset stored as a string: "45.5".
1. Store "45.5" in a variable called \`raw_value\`.
2. Convert \`raw_value\` to a **float** and store it in \`clean_value\`.
3. Add \`10.0\` to \`clean_value\`.
4. Print the result.`,
            prefill: `# Write your casting code here:\n`,
            solution: 'raw_value = "45.5"\nclean_value = float(raw_value)\nresult = clean_value + 10.0\nprint(result)'
          },
          {
            type: BlockType.QUIZ,
            content: "What happens if you run '10' + '10' in Python?",
            options: [
              "20",
              "1010",
              "Error",
              "10"
            ],
            correctAnswerIndex: 1,
            explanation: "Since both are strings, Python concatenates (joins) them together, resulting in '1010'."
          }
        ]
      },
      {
        id: '5-input',
        title: '7. User Input',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `### 7.1 Talking to the User
Scripts are often interactive. You might need to ask the user for a Level Name, a Sheet Number prefix, or a coordinate offset.

We use the \`input()\` function.
*   **Prompt:** You can put text inside the parentheses to ask the question: \`input("Enter height: ")\`.
*   **Result:** The user's answer is **ALWAYS** returned as a **String** (Text).
*   **Web Note:** In this browser course, \`input()\` might appear as a browser popup. On your desktop, it appears in the terminal.

### 7.2 Input and Casting
Because \`input()\` always returns a String, if you want to use the input for math (like asking for a length), you **MUST** cast it immediately.`
          },
          {
             type: BlockType.CODE_EXAMPLE,
             content: `# 1. Simple text input
user_name = input("What is your name? ")
print(f"Welcome, {user_name}!")

# 2. Numeric Input (The Trap)
age_text = input("Enter your age: ")
# next_year = age_text + 1  <-- THIS WILL CRASH! "25" + 1 is illegal.

# 3. Numeric Input (The Solution)
# We must 'Cast' the string to an integer
age = int(age_text)
next_year = age + 1
print(f"Next year you will be {next_year}.")`,
             visualPrompt: "A simple 2D flowchart. Step 1: User types '25'. Step 2: The text '25' travels to a box labeled 'int()'. Step 3: It transforms into a solid number block 25. Style: Flat technical diagram, blueprint colors."
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-input',
            title: 'Exercise: Architect Interaction',
            content: `Write a script that asks the architect for details.
1. Ask for the **Project Name** using \`input()\`.
2. Ask for the **Number of Floors** using \`input()\`.
3. Convert the floors to an integer.
4. Calculate total height assuming 3.5m per floor.
5. Print: "Project [Name] is [Height] meters high."`,
            prefill: `# Write your interactive script here:\n`,
            solution: 'name = input("Project Name: ")\nfloors = int(input("Floors: "))\nheight = floors * 3.5\nprint(f"Project {name} is {height} meters high.")'
          },
          {
            type: BlockType.QUIZ,
            content: "The input() function always returns data as which type?",
            options: [
              "Integer",
              "Float",
              "String",
              "Whatever the user typed"
            ],
            correctAnswerIndex: 2,
            explanation: "No matter if the user types letters or numbers, input() always captures it as a String text."
          }
        ]
      },
      {
        id: '8-operators',
        title: '8. Operators & Logic',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `Operators allow us to compare values. This is the foundation of automated decision making (e.g., "If clash detected, highlight element").

Comparison Operators return a **Boolean** (True/False):
*   \`==\` (Equal to) -> Note the double equals! Single \`=\` is for assignment.
*   \`!=\` (Not equal to)
*   \`>\` (Greater than)
*   \`<\` (Less than)
*   \`>=\` (Greater than or equal to)

### logical Operators
Combine multiple checks:
*   \`and\`: Both conditions must be True.
*   \`or\`: At least one condition must be True.
*   \`not\`: Reverses the result.`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `required_fire_rating = 60
door_fire_rating = 45

# Check if the door passes requirements
is_compliant = door_fire_rating >= required_fire_rating

print(f"Door Rating: {door_fire_rating}")
print(f"Required: {required_fire_rating}")
print(f"Is Compliant? {is_compliant}")

# Complex Logic with AND/OR
wall_type = "Exterior"
height = 2500

# Check if it's a Short Exterior Wall
is_short_exterior = (wall_type == "Exterior") and (height < 3000)
print(f"Is Short Exterior? {is_short_exterior}")`,
            visualPrompt: "A simple 2D logic gate diagram. Two lines labeled 'A' and 'B' enter a shape labeled 'AND'. One line comes out. Style: Schematic symbol, high contrast black and white."
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-5',
            title: 'Exercise 5: Simple Clash Check',
            content: `Simulate a basic vertical clash detection.
1. Define \`duct_elevation = 3200\`
2. Define \`beam_bottom_elevation = 3100\`
3. Create a boolean variable \`is_clashing\` that is True if \`duct_elevation\` is greater than \`beam_bottom_elevation\`.
4. Print the result.`,
            prefill: `# Clash detection logic:\n`,
            solution: 'duct_elevation = 3200\nbeam_bottom_elevation = 3100\nis_clashing = duct_elevation > beam_bottom_elevation\nprint(is_clashing)'
          },
          {
             type: BlockType.QUIZ,
             content: "Part 1 Review: What is the correct way to check if a variable 'width' is equal to 100?",
             options: [
               "if width = 100:",
               "if width == 100:",
               "if width is 100:",
               "if width equals 100:"
             ],
             correctAnswerIndex: 1,
             explanation: "The double equals (==) is used for comparison. A single equals (=) is used for assignment (setting a value)."
           }
        ]
      }
    ]
  },
  {
    id: 'part-2',
    title: 'Part 2: Data Structures & Pandas',
    description: 'Move beyond single variables. Learn to manage lists of thousands of elements, handle dictionaries of properties, and use Pandas to process schedules like a pro.',
    sections: [
      {
        id: '2-1-strings',
        title: '1. Advanced Strings',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `In BIM, we deal with strings constantly: Sheet Names, Element IDs, Family Names, and Parameter values. Python provides powerful tools to manipulate text.`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `sheet_code = "A-101"
sheet_name = "Ground Floor Plan"

# 1. F-Strings (Formatted Strings)
# The modern, clean way to combine text and variables
full_title = f"{sheet_code} - {sheet_name} (Rev 01)"
print(full_title)

# 2. String Methods
family_name = "M_Fixed Window_Double: 1200x1500mm"

# Convert case
print(family_name.upper()) 

# Replace text
clean_name = family_name.replace("M_", "").replace("_", " ")
print(clean_name)

# Split text into a list
# Useful for separating Family Name from Type Name
parts = family_name.split(":")
print(parts)
print(f"Family: {parts[0]}")`
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-2-1',
            title: 'Exercise 1: Standardizing Names',
            content: `You have a raw layer name from a CAD export: "WALL_EXTERIOR_CONCRETE".
1. Store this in a variable.
2. Convert it to lowercase.
3. Replace the underscores \`_\` with spaces.
4. Print the final cleaned string "wall exterior concrete".`,
            prefill: `# String manipulation:\n`,
            solution: 'raw = "WALL_EXTERIOR_CONCRETE"\nclean = raw.lower().replace("_", " ")\nprint(clean)'
          },
          {
            type: BlockType.QUIZ,
            content: "What is the best way to inject the variable 'level' into a string?",
            options: [
              "\"Level is \" + level",
              "f\"Level is {level}\"",
              "\"Level is {level}\"",
              "string(level)"
            ],
            correctAnswerIndex: 1,
            explanation: "F-Strings (f\"...\") are the most modern and readable way to insert variables into text."
          }
        ]
      },
      {
        id: '2-2-lists',
        title: '2. Lists (Ordered Data)',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `Lists are used to store collections of elements, like a list of Room Names, a list of Beam IDs, or a list of concrete volumes. They are ordered and mutable (changable).`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# A list of levels in a building
levels = ["L1", "L2", "L3", "Roof"]

# Accessing items (Indexing starts at 0)
print(f"The ground floor is: {levels[0]}")
print(f"The top floor is: {levels[-1]}") # -1 gives the last item

# Slicing (Getting a subset)
print(f"Typical floors: {levels[1:3]}")

# Adding a new level
levels.append("Parapet")
print(levels)

# Modifying a value
levels[0] = "Ground Floor"
print(levels)`
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-2-2',
            title: 'Exercise 2: Equipment List',
            content: `You are building a list of mechanical equipment.
1. Create a list called \`equipment\` with: "Chiller", "Pump", "Boiler".
2. Append "Expansion Tank" to the list.
3. Print the second item in the list ("Pump").
4. Print the total count of items using \`len()\`.`,
            prefill: `# List operations:\n`,
            solution: 'equipment = ["Chiller", "Pump", "Boiler"]\nequipment.append("Expansion Tank")\nprint(equipment[1])\nprint(len(equipment))'
          },
          {
            type: BlockType.QUIZ,
            content: "If my_list = ['A', 'B', 'C'], what is my_list[1]?",
            options: [
              "'A'",
              "'B'",
              "'C'",
              "Error"
            ],
            correctAnswerIndex: 1,
            explanation: "Python list indices start at 0. So index 0 is 'A', index 1 is 'B'."
          }
        ]
      },
      {
        id: '2-3-strings-lists',
        title: '3. Strings are Lists',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `### 2.3 Text is just a sequence
In Python, a String is essentially a **List of Characters**. This is incredibly useful in BIM for parsing codes, extracting prefixes, or analyzing standard naming conventions.

*   **Indexing:** You can grab a specific letter using \`[]\`.
*   **Slicing:** You can grab a range of text using \`[start:end]\`.
*   **Len:** You can count characters using \`len()\`.`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `sheet_number = "A-501-Rev2"

# 1. Indexing (Getting one character)
first_letter = sheet_number[0] 
print(f"Discipline: {first_letter}")

# 2. Slicing (Getting a chunk)
# [start : end] (End is not included!)
sheet_code = sheet_number[0:5] # From index 0 up to (but not including) 5
print(f"Base Number: {sheet_code}")

# 3. Negative Indexing (Counting from the end)
revision = sheet_number[-1] # Last character
print(f"Revision: {revision}")

# 4. Slicing from a point to the end
description = "Wall: Generic 200mm"
material_text = description[6:] # From index 6 to the end
print(f"Material: {material_text}")`,
             visualPrompt: "A simple 2D diagram showing the text 'A-101' inside boxes. Above each box is a number 0, 1, 2, 3, 4. Below each box is a negative number -5, -4, -3, -2, -1. Style: Flat technical illustration."
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-2-3',
            title: 'Exercise: Code Breaker',
            content: `You have a standard BIM element ID: "ST-COL-450x450".
1. Store this in a variable.
2. Extract the first 2 letters ("ST") to find the discipline.
3. Extract the last 7 characters ("450x450") to find the size.
4. Print both.`,
            prefill: `element_id = "ST-COL-450x450"\n# Extract and print:\n`,
            solution: 'element_id = "ST-COL-450x450"\ndisc = element_id[0:2]\nsize = element_id[-7:]\nprint(disc)\nprint(size)'
          },
          {
            type: BlockType.QUIZ,
            content: "What does 'Revit'[-1] return?",
            options: [
              "'R'",
              "'e'",
              "'t'",
              "Error"
            ],
            correctAnswerIndex: 2,
            explanation: "Negative indices count from the end. -1 is the last character."
          }
        ]
      },
      {
        id: '2-3b-sets',
        title: '4. Sets (Unique Data)',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `### 3.1 The duplicate killer
Sets are similar to lists, but with two major differences:
1.  **Unordered:** You cannot access items by index (no \`set[0]\`).
2.  **Unique:** They do not allow duplicate values.

In BIM, this is the perfect tool for extracting **Unique Values** from a model.
*   "List all *unique* wall types used in Level 1."
*   "Get all *unique* material names from this selection."
*   "Find the *unique* disciplines involved in this project."`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# A raw list of materials extracted from elements (lots of duplicates)
raw_materials = [
    "Concrete", "Brick", "Concrete", "Gypsum", 
    "Brick", "Glass", "Concrete"
]

# 1. Convert List to Set (Removes Duplicates)
unique_materials = set(raw_materials)

print(f"Raw List: {raw_materials}")
print(f"Unique Set: {unique_materials}")

# 2. Checking for existence (Fast)
# Sets are optimized for checking "Is X inside Y?"
if "Glass" in unique_materials:
    print("Glass is present.")

# 3. Adding to a set
unique_materials.add("Steel") # Works
unique_materials.add("Concrete") # Will be ignored (already exists)
print(unique_materials)`,
            visualPrompt: "A simple 2D diagram. A funnel labeled 'set()'. Into the top go multiple blocks labeled 'A', 'B', 'A', 'C', 'B'. Out the bottom come single blocks 'A', 'B', 'C'. Style: Flat vector illustration, clean lines."
          },
          {
             type: BlockType.EXERCISE,
             id: 'ex-sets',
             title: 'Exercise: Discipline Extractor',
             content: `You have a list of sheet prefixes extracted from a drawing set: \`["A", "S", "M", "A", "E", "S", "A"]\`.
1. Store the list in a variable \`all_disciplines\`.
2. Convert it to a set called \`unique_disciplines\`.
3. Print the count of unique disciplines.
4. Print the set itself.`,
             prefill: `all_disciplines = ["A", "S", "M", "A", "E", "S", "A"]\n# Extract unique values:\n`,
             solution: 'all_disciplines = ["A", "S", "M", "A", "E", "S", "A"]\nunique_disciplines = set(all_disciplines)\nprint(len(unique_disciplines))\nprint(unique_disciplines)'
          },
          {
            type: BlockType.QUIZ,
            content: "What is the key feature of a Set?",
            options: [
              "It keeps items in order.",
              "It allows duplicates.",
              "It automatically removes duplicates.",
              "It is immutable."
            ],
            correctAnswerIndex: 2,
            explanation: "Sets are unordered collections of unique elements."
          }
        ]
      },
      {
        id: '2-3c-tuples',
        title: '5. Tuples (Immutable Data)',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `### 5.1 What is a Tuple?
A **Tuple** is basically a "Locked List". Once you create it, you cannot change, add, or remove items.
*   **Syntax:** Uses parentheses \`()\`.
*   **Immutable:** This is a key computer science term meaning "unchangeable".

#### Why use them in BIM?
They are perfect for fixed data that *should not* change during the script, such as:
*   **Coordinates (X, Y, Z):** A point in space is a fixed entity.
*   **RGB Colors:** (255, 0, 0) is always Red.
*   **Config Settings:** Hardcoded database connections.`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# Defining a Tuple (XYZ Coordinate)
origin_point = (0.0, 0.0, 0.0)
column_location = (4500.0, 3200.0, 0.0)

# Accessing items (Same as List)
x_coord = column_location[0]
print(f"X Coordinate: {x_coord}")

# THE DIFFERENCE: Immutability
# column_location[0] = 5000.0  
# CRASH! TypeError: 'tuple' object does not support item assignment

# Use Case: Unpacking
# You can assign variables directly from a tuple
x, y, z = column_location
print(f"Unpacked: X={x}, Y={y}, Z={z}")`
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-tuples',
            title: 'Exercise: Color Code',
            content: `1. Create a tuple named \`warning_color\` representing RGB Orange: \`(255, 165, 0)\`.
2. Print the Green component (the second item).
3. Try to explain in a comment why using a tuple is safer than a list for this specific data.`,
            prefill: `# Define tuple:\n\n# Print Green component:\n`,
            solution: 'warning_color = (255, 165, 0)\nprint(warning_color[1])'
          },
          {
            type: BlockType.QUIZ,
            content: "Which statement about Tuples is true?",
            options: [
              "They use square brackets [ ].",
              "You can append new items to them.",
              "They are immutable (cannot be changed).",
              "They cannot store numbers."
            ],
            correctAnswerIndex: 2,
            explanation: "Tuples are immutable sequences, defined with parentheses ( )."
          }
        ]
      },
      {
        id: '2-3d-ds-comparison',
        title: '6. Data Structure Comparison',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `### 6.1 Choosing the Right Tool
          BIM Developers need to pick the right structure for the job.

          | Structure | Syntax | Ordered? | Changeable? | Duplicates? | Best Usage |
          | :--- | :--- | :--- | :--- | :--- | :--- |
          | **List** | \`[ ]\` | Yes | Yes | Yes | Collecting elements, sheets, rooms. |
          | **Set** | \`{ }\` | No | Yes | No | Finding unique values (Materials, Categories). |
          | **Tuple** | \`( )\` | Yes | No | Yes | Coordinates, Colors, Return values. |

          ### 6.2 Converting (Casting)
          Just like casting Int to String, you can cast between structures.
          * \`list(my_set)\` -> Converts Set to List (Good for indexing later).
          * \`set(my_list)\` -> Removes duplicates.
          * \`tuple(my_list)\` -> Locks the data.`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# 1. Cleaning a List using Set
raw_ids = [101, 102, 101, 103, 102]
unique_ids = list(set(raw_ids)) # List -> Set (Clean) -> List
print(f"Cleaned IDs: {unique_ids}")

# 2. Locking data
# We processed the data, now we lock it so it doesn't change accidentally
final_data = tuple(unique_ids)
print(f"Final Locked Data: {final_data}")`
          },
          {
             type: BlockType.EXERCISE,
             id: 'ex-ds-convert',
             title: 'Exercise: Data Cleaner',
             content: `You have a list of point coordinates, but some are duplicates: \`[(0,0), (1,1), (0,0), (2,5)]\`.
1. Store this list.
2. Convert it to a **Set** to remove duplicates.
3. Print the result.
*Note: Since the items inside are tuples (points), they work in sets!*`,
             prefill: `points = [(0,0), (1,1), (0,0), (2,5)]\n# Remove duplicates:\n`,
             solution: 'points = [(0,0), (1,1), (0,0), (2,5)]\nunique_points = set(points)\nprint(unique_points)'
          },
          {
            type: BlockType.QUIZ,
            content: "Which bracket type is used to define a List?",
            options: [
              "( )",
              "[ ]",
              "{ }",
              "< >"
            ],
            correctAnswerIndex: 1,
            explanation: "Lists use square brackets [ ]. Sets and Dictionaries use curly braces { }. Tuples use parentheses ( )."
          }
        ]
      },
      {
        id: '2-4-dictionaries',
        title: '7. Dictionaries (Key-Value)',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `Dictionaries are arguably the most important data structure for BIM. They perfectly represent **Element Properties**. A dictionary maps a unique "Key" (Parameter Name) to a "Value".`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# Represents one Door element
door_properties = {
    "Mark": "D101",
    "Family": "Single-Flush",
    "Width": 900,
    "Height": 2100,
    "FireRating": 60
}

# Accessing data by Key
print(f"Door Mark: {door_properties['Mark']}")
print(f"Width: {door_properties['Width']} mm")

# Adding a new parameter
door_properties["Cost"] = 450.00

# Modifying a parameter
door_properties["Mark"] = "D101-A"

print(door_properties)`,
            visualPrompt: "A simple 2D illustration of a set of lockers. Each locker door has a label (Key) and inside is an item (Value). Style: Flat cartoon, no 3D, blueprint colors."
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-2-4',
            title: 'Exercise 3: Beam Properties',
            content: `Create a dictionary representing a Structural Beam.
1. Create a dict called \`beam\`.
2. Add Keys: "Type" ("HEA300"), "Length" (4000), "Material" ("Steel S355").
3. Print a formatted sentence: "The beam is made of [Material] and is [Length] mm long."`,
            prefill: `# Dictionary creation:\n`,
            solution: 'beam = {"Type": "HEA300", "Length": 4000, "Material": "Steel S355"}\nprint(f"The beam is made of {beam[\'Material\']} and is {beam[\'Length\']} mm long.")'
          },
          {
            type: BlockType.QUIZ,
            content: "In the dictionary {'id': 101, 'type': 'Wall'}, what is 'id' called?",
            options: [
              "Index",
              "Value",
              "Key",
              "Element"
            ],
            correctAnswerIndex: 2,
            explanation: "Dictionaries are made of Key:Value pairs. 'id' is the Key, and 101 is the Value."
          }
        ]
      },
      {
        id: '2-5-logic',
        title: '8. Logic Flow (If/Else)',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `Automation requires decisions. "If the wall is shorter than 1 meter, delete it." "If the parameter is empty, warn the user."`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `pipe_elevation = 2800
ceiling_elevation = 2750
tolerance = 50

# Logic Block
if pipe_elevation < ceiling_elevation:
    status = "CLASH: Pipe is below ceiling"
    action = "Move Pipe Up"
elif pipe_elevation == ceiling_elevation:
    status = "TOUCHING: Zero tolerance"
    action = "Check Insulation"
elif pipe_elevation < (ceiling_elevation + tolerance):
    status = "WARNING: Inside tolerance zone"
    action = "Review"
else:
    status = "CLEAR"
    action = "None"

print(f"Status: {status}")
print(f"Action: {action}")`
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-2-5',
            title: 'Exercise 4: Room Standards',
            content: `Write a script to check if a room meets area standards.
1. Define variable \`area\`. Set it to 15.
2. If \`area\` is greater than 20, print "Meeting Room".
3. Else if \`area\` is greater than 10, print "Office".
4. Else, print "Storage".
Try changing the value of \`area\` to test different outcomes.`,
            prefill: `# Logic flow:\narea = 15\n`,
            solution: 'area = 15\nif area > 20:\n    print("Meeting Room")\nelif area > 10:\n    print("Office")\nelse:\n    print("Storage")'
          },
          {
            type: BlockType.QUIZ,
            content: "Which keyword is used to add a second condition if the first one fails?",
            options: [
              "else",
              "else if",
              "elif",
              "then"
            ],
            correctAnswerIndex: 2,
            explanation: "Python uses 'elif' (short for else if) to check subsequent conditions."
          }
        ]
      },
      {
        id: '2-5b-match-case',
        title: '9. Switch Case (Match)',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `### 9.1 The Modern Way to Decide
Introduced in Python 3.10, the \`match\` statement (often called Switch Case in other languages) is a cleaner alternative to writing many \`elif\` statements.

It is particularly useful in BIM when checking a variable against many known options (e.g., Revit Categories).`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `element_category = "Walls"

# The Old Way (Many elifs)
# if category == "Walls": ...
# elif category == "Doors": ...

# The New Way (Match)
match element_category:
    case "Walls":
        print("Export to IFC_Walls layer")
    case "Doors" | "Windows": # | means OR
        print("Export to IFC_Openings layer")
    case "Roofs":
        print("Export to IFC_Roofs layer")
    case _:
        # This is the "Else" (Default) case
        print("Export to Generic layer")`
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-match',
            title: 'Exercise: File Type Checker',
            content: `Use a match statement to handle file extensions.
1. Define \`file_ext = ".rvt"\`.
2. Match \`file_ext\`:
   - Case ".rvt": Print "Revit Model".
   - Case ".dwg": Print "AutoCAD Drawing".
   - Case ".ifc": Print "Industry Foundation Class".
   - Case _: Print "Unknown Format".`,
            prefill: `file_ext = ".rvt"\n# Write match statement:\n`,
            solution: 'file_ext = ".rvt"\nmatch file_ext:\n    case ".rvt":\n        print("Revit Model")\n    case ".dwg":\n        print("AutoCAD Drawing")\n    case ".ifc":\n        print("Industry Foundation Class")\n    case _:\n        print("Unknown Format")'
          },
          {
            type: BlockType.QUIZ,
            content: "What keyword is used to handle the default case (when no other cases match) in a match statement?",
            options: [
              "default",
              "else",
              "case _",
              "case default"
            ],
            correctAnswerIndex: 2,
            explanation: "The underscore 'case _:' acts as the wildcard or default catch-all in a match statement."
          }
        ]
      },
      {
        id: '2-6-loops',
        title: '10. For Loops',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `Loops allow us to process thousands of BIM elements instantly. The \`for\` loop is the most common. It iterates over a sequence (like a List).`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `room_areas = [12.5, 15.0, 9.8, 20.2, 11.5]

total_area = 0

# Iterate through every item in the list
for area in room_areas:
    # Add current area to total
    total_area = total_area + area
    print(f"Added {area}... Total so far: {total_area}")

print(f"FINAL TOTAL AREA: {total_area} m2")

# Filtering inside a loop
print("--- Large Rooms Only ---")
for area in room_areas:
    if area > 12:
        print(f"Found large room: {area}")`
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-2-6',
            title: 'Exercise 5: Finding Long Walls',
            content: `You have a list of wall lengths: \`[3000, 4500, 2000, 6000]\`.
1. Write a for loop that goes through each length.
2. Inside the loop, check **if** the length is greater than 4000.
3. If it is, print "Long Wall found: " followed by the length.`,
            prefill: `lengths = [3000, 4500, 2000, 6000]\n# Write your loop here:\n`,
            solution: 'lengths = [3000, 4500, 2000, 6000]\nfor l in lengths:\n    if l > 4000:\n        print(f"Long Wall found: {l}")'
          },
          {
            type: BlockType.QUIZ,
            content: "What will the code 'for i in range(3): print(i)' output?",
            options: [
              "1, 2, 3",
              "0, 1, 2",
              "0, 1, 2, 3",
              "1, 2"
            ],
            correctAnswerIndex: 1,
            explanation: "range(3) generates numbers 0, 1, and 2. It starts at 0 and stops before the specified number."
          }
        ]
      },
      {
        id: '2-7-while-loops',
        title: '11. While Loops',
        blocks: [
          {
             type: BlockType.MARKDOWN,
             content: `### 11.1 Looping until a Condition is Met
A \`for\` loop runs a specific number of times (e.g., once for each item in a list). 
A \`while\` loop runs **as long as** a condition is True.

**Warning:** If the condition never becomes False, you get an "Infinite Loop", which freezes the computer.

#### Usage in BIM
*   "Keep moving the beam down until it hits the floor."
*   "Keep asking the user for input until they type 'exit'."`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# Example: Placing Bricks
bricks_in_hand = 5

while bricks_in_hand > 0:
    print(f"Placing brick... Remaining: {bricks_in_hand}")
    # IMPORTANT: Change the condition variable
    bricks_in_hand = bricks_in_hand - 1

print("Job Done. No more bricks.")`
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-while',
            title: 'Exercise: Countdown',
            content: `Create a countdown for a script execution.
1. Set \`timer = 5\`.
2. Create a \`while\` loop that runs while \`timer > 0\`.
3. Inside, print the timer value.
4. Decrease timer by 1.
5. After the loop, print "Launch!".`,
            prefill: `timer = 5\n# Write while loop:\n`,
            solution: 'timer = 5\nwhile timer > 0:\n    print(timer)\n    timer = timer - 1\nprint("Launch!")'
          },
          {
            type: BlockType.QUIZ,
            content: "What happens if you forget to update the condition variable in a while loop?",
            options: [
              "The loop runs once and stops.",
              "The code throws a Syntax Error.",
              "You get an Infinite Loop (it never stops).",
              "It automatically fixes itself."
            ],
            correctAnswerIndex: 2,
            explanation: "If the condition remains True forever, the loop never ends, freezing the program."
          }
        ]
      },
      {
        id: '2-8-pandas',
        title: '12. Pandas (Data Analysis)',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `**Pandas** is essentially "Excel for Python". It is the industry standard for handling Schedules, BOQs (Bill of Quantities), and Element Reports. It organizes data into a DataFrame (Table).

#### Reading and Writing Files (CSV & Excel)
In real-world automation, you rarely type data manually. You read it from Excel or CSV exports from Revit/Navisworks.
*   **CSV:** \`pd.read_csv('file.csv')\` - Fast, simple text format.
*   **Excel:** \`pd.read_excel('file.xlsx')\` - Requires the \`openpyxl\` library.

**Note:** In this web playground, we simulate file creation so you can test the code.
`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `import pandas as pd
import io

# 1. CREATING A DATAFRAME
data = {
    "Room Name": ["Office", "Corridor", "Meeting Room", "Storage", "Lobby"],
    "Area_m2": [15, 45, 25, 8, 120],
    "Level": ["L1", "L1", "L2", "L1", "L1"]
}
df = pd.DataFrame(data)

print("--- Original DataFrame ---")
print(df)

# 2. WRITING TO EXCEL (Virtual File)
# We save it to the browser's virtual memory
print("--- Saving to 'rooms.xlsx' ---")
df.to_excel("rooms.xlsx", index=False)
print("Saved successfully (Internal Memory).")

# 3. READING FROM EXCEL
# Now we read it back to prove it works!
print("--- Reading back from 'rooms.xlsx' ---")
df_loaded = pd.read_excel("rooms.xlsx")
print(df_loaded)

# 4. FILTERING
# Select rooms on L1 with Area > 20
filtered_df = df[ (df["Level"] == "L1") & (df["Area_m2"] > 20) ]

print("--- Filtered Results (L1 & Area > 20) ---")
print(filtered_df)`,
            visualPrompt: "A simple 2D flat vector illustration of a panda holding a spreadsheet grid. Style: Minimalist icon, single color background, no 3D."
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-2-8',
            title: 'Exercise 6: Beam Schedule Analysis',
            content: `Use Pandas to analyze a beam schedule.
1. Run the setup code to create the DataFrame \`df_beams\`.
2. Filter the DataFrame to find beams where 'Length' is greater than 3000. Store this in \`long_beams\`.
3. Print \`long_beams\`.
4. **Bonus:** Calculate and print the sum of 'Length' for all beams.`,
            prefill: `import pandas as pd

# Setup Data
beam_data = {
    "Beam_ID": ["B1", "B2", "B3", "B4"],
    "Type": ["IPE300", "IPE300", "HEB200", "IPE300"],
    "Length": [2500, 6000, 3500, 1200]
}
df_beams = pd.DataFrame(beam_data)

# Write your analysis code below:
`,
            solution: 'long_beams = df_beams[df_beams["Length"] > 3000]\nprint(long_beams)\nprint(df_beams["Length"].sum())'
          },
          {
            type: BlockType.QUIZ,
            content: "What is the primary data structure in Pandas used to store tables?",
            options: [
              "List",
              "Dictionary",
              "DataFrame",
              "Matrix"
            ],
            correctAnswerIndex: 2,
            explanation: "The DataFrame is the core Pandas object, representing a 2-dimensional labeled data structure with columns of potentially different types."
          }
        ]
      },
      {
        id: '9-errors-moved',
        title: '13. Error Handling (Try/Except)',
        blocks: [
           {
             type: BlockType.MARKDOWN,
             content: `### 7.1 When Things Go Wrong
In construction, if a beam doesn't fit, you don't abandon the building; you apply a fix. In coding, if an error occurs, we don't want the software to crash; we want to handle it.

We use \`try\` and \`except\`.
*   **try:** "Try to run this dangerous code."
*   **except:** "If it crashes, run this safety code instead."

This is essential for BIM automation when dealing with messy data (e.g., a wall missing a parameter value).`
           },
           {
             type: BlockType.CODE_EXAMPLE,
             content: `# SCENARIO: User enters text instead of a number

user_value = "Five" # Simulate user typing words

# --- WITHOUT PROTECTION ---
# num = int(user_value) 
# CRASH! ValueError: invalid literal for int()

# --- WITH PROTECTION (Try/Except) ---
try:
    # Dangerous line
    num = int(user_value)
    print(f"Conversion successful: {num}")
except:
    # Safety net
    print("Error: Please enter a numeric digit (e.g., 5), not text.")

print("The script continues running...")`
           },
           {
             type: BlockType.EXERCISE,
             id: 'ex-try',
             title: 'Exercise 7: The Safe Divider',
             content: `Create a safe division tool.
1. Define \`total_cost = 1000\`.
2. Define \`units = 0\`.
3. Write a \`try/except\` block:
    *   **Try:** Calculate \`cost_per_unit = total_cost / units\` and print it.
    *   **Except:** Print "Cannot divide by zero! Check unit count."`,
             prefill: `total_cost = 1000\nunits = 0\n\n# Write your try/except block:\n`,
             solution: 'total_cost = 1000\nunits = 0\ntry:\n    cost_per_unit = total_cost / units\n    print(cost_per_unit)\nexcept:\n    print("Cannot divide by zero! Check unit count.")'
           },
           {
            type: BlockType.QUIZ,
            content: "Which block contains the code that runs ONLY if an error occurs?",
            options: [
              "try",
              "except",
              "else",
              "finally"
            ],
            correctAnswerIndex: 1,
            explanation: "The 'except' block is the safety net. It only executes if the 'try' block fails."
          }
        ]
      },
      {
        id: '2-9-functions',
        title: '14. Defining Functions',
        blocks: [
          {
             type: BlockType.MARKDOWN,
             content: `### 8.1 Reusable Tools
A **Function** is like creating your own Revit Command. Instead of rewriting code, you bundle it into a named block that you can use over and over.

*   **def:** Keyword to start (define) a function.
*   **Arguments:** The data inputs (parameters) the function needs.
*   **Return:** The result the function gives back.

Think of a function like a machine on site: You put in raw materials (Arguments), the machine works, and it spits out a finished product (Return).`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `# Define the function ONCE
def calculate_beam_weight(length_m, weight_per_meter):
    """Calculates total weight of a steel beam."""
    total_weight = length_m * weight_per_meter
    return total_weight

# Use the function MANY times
beam_1 = calculate_beam_weight(5.0, 45.0)
beam_2 = calculate_beam_weight(3.5, 45.0)
beam_3 = calculate_beam_weight(6.0, 120.0)

print(f"Beam 1 Weight: {beam_1} kg")
print(f"Beam 2 Weight: {beam_2} kg")
print(f"Beam 3 Weight: {beam_3} kg")`,
            visualPrompt: "A simple 2D process diagram. Left: Input circle labeled 'Arguments'. Center: Box labeled 'Function'. Right: Output square labeled 'Return'. Style: Flat vector illustration, schematic."
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-functions',
            title: 'Exercise 8: Unit Converter',
            content: `Create a function that converts millimeters to meters.
1. Define a function named \`mm_to_m\` that takes one argument \`mm_val\`.
2. Inside, calculate \`m_val = mm_val / 1000\`.
3. Return \`m_val\`.
4. Call the function with \`2500\` and print the result.`,
            prefill: `# Define your function here:\n\n# Call it and print result:\n`,
            solution: 'def mm_to_m(mm_val):\n    return mm_val / 1000\n\nprint(mm_to_m(2500))'
          },
          {
            type: BlockType.QUIZ,
            content: "What keyword starts a function definition in Python?",
            options: [
              "function",
              "void",
              "def",
              "define"
            ],
            correctAnswerIndex: 2,
            explanation: "Python uses 'def' followed by the function name and parentheses to define a new function."
          }
        ]
      },
      {
        id: '2-10-oop',
        title: '15. Object-Oriented Programming (OOP)',
        blocks: [
          {
            type: BlockType.MARKDOWN,
            content: `### 9.1 The Blueprint of Code
**OOP** is the concept behind Families and Types in Revit.

*   **Class (The Family):** The blueprint or template. It defines what properties (parameters) and actions (methods) an object *should* have. e.g., "Wall Family".
*   **Object (The Instance):** A specific thing created from that blueprint. e.g., "This specific wall in the Kitchen".
*   **self:** A way for the object to refer to its own data.

#### Why OOP in BIM?
API development (Revit API, RhinoCommon) is almost entirely OOP. To control a Revit Wall, you need to understand it as an Object with Properties.`
          },
          {
            type: BlockType.CODE_EXAMPLE,
            content: `class Wall:
    # The Constructor (__init__ runs when we create a new wall)
    def __init__(self, wall_id, height, thickness):
        self.id = wall_id           # Property
        self.height = height        # Property
        self.thickness = thickness  # Property
    
    # A Method (Action)
    def calculate_volume(self, length):
        vol = length * self.height * (self.thickness / 1000)
        return vol

    def describe(self):
        print(f"Wall {self.id}: H={self.height}mm, Thk={self.thickness}mm")

# Creating Instances (Placing Walls)
wall_a = Wall("W-101", 3000, 200)
wall_b = Wall("W-102", 4000, 150)

# Accessing Data
wall_a.describe()
wall_b.describe()

# Using Methods
vol_a = wall_a.calculate_volume(5.0) # Length 5m
print(f"Volume of Wall A: {vol_a} m3")`,
             visualPrompt: "A simple 2D schematic. Left: A blue rectangle labeled 'Blueprint (Class)'. Right: Three rectangles labeled 'Object 1', 'Object 2', 'Object 3' with lines connecting back to the blueprint. Style: Flat technical diagram, blueprint style."
          },
          {
            type: BlockType.EXERCISE,
            id: 'ex-oop',
            title: 'Exercise 9: Room Class',
            content: `Create a Class to represent a Room.
1. Define a class named \`Room\`.
2. In \`__init__\`, accept \`name\` and \`area_m2\` and store them using \`self\`.
3. Create a method \`is_large(self)\` that returns \`True\` if area > 20, else \`False\`.
4. Create an instance for "Lobby" with area 50.
5. Print if the lobby is large by calling the method.`,
            prefill: `# Define Class Room:\n\n# Create Instance and Test:\n`,
            solution: 'class Room:\n    def __init__(self, name, area_m2):\n        self.name = name\n        self.area_m2 = area_m2\n    def is_large(self):\n        return self.area_m2 > 20\n\nlobby = Room("Lobby", 50)\nprint(lobby.is_large())'
          },
          {
             type: BlockType.QUIZ,
             content: "Part 2 Review: What data structure is best for storing a collection of unique materials (no duplicates)?",
             options: [
               "List [ ]",
               "Dictionary { }",
               "Set ( )",
               "String ' '"
             ],
             correctAnswerIndex: 2,
             explanation: "Correct! A Set automatically removes duplicates, making it perfect for finding unique values like material types in a model."
           }
        ]
      }
    ]
  }
];
