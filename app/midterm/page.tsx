'use client'

import CodeBlock from '@/components/CodeBlock'
import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

// --- 🔦 EMERALD CURSOR LIGHT ---
function MidtermCursorLight() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 25 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250) 
      mouseY.set(e.clientY - 250)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{ x, y }}
      className="fixed top-0 left-0 w-[500px] h-[500px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none z-0"
    />
  )
}

// --- ⌨️ TYPING EFFECT ---
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000)
      return
    }
    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, reverse ? 75 : 150)
    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, words])

  return (
    <span className="font-mono text-emerald-400">
      &#123;{words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>&#125;
    </span>
  )
}

/* ─── Data Arrays ───────────────── */

// Fixed: Added 'const quizzes' name to the floating array
const quizzes = [
  {
    num: 1,
    title: 'Java Fundamentals',
    score: '25 / 30',
    scoreColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/12 border-emerald-500/25',
    focus: 'Core Syntax · Data Handling · Information Structures',
    reflection: `Having a background in C#, the transition was relatively smooth. However, the quiz highlighted the importance of mastering Java-specific data handling and basic information structures from the ground up — subtle differences in type casting and default values tripped me up.`,
    noticeType: 'f2f',
    notice: 'Assessment conducted face-to-face. Hardcopy retained by instructor.',
  },
  {
    num: 2,
    title: 'Arrays & Methods',
    score: '41 / 50',
    scoreColor: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/12 border-indigo-500/25',
    focus: '2D Arrays · Method Signatures · Scanner Input · Short-Circuit Logic',
    reflection: `I navigated complex topics such as Short-Circuit Logic and Scanner resource management. Minor errors in method execution and switch-case data types provided a pivotal learning moment regarding Java's strict type-checking requirements.`,
    noticeType: 'online',
    notice: 'Online assessment. Certain automated grading discrepancies remain under instructor review.',
  },
]

const quiz2Data = [
  { status: 'correct', q: 'When working with arrays, can accessing an index that does not exist lead to a runtime error?', a: 'True', exp: 'Accessing an invalid index throws an ArrayIndexOutOfBoundsException.' },
  { status: 'incorrect', q: 'What will the method int add(int a, int b) return?', a: 'An integer result', exp: 'The return type is declared immediately before the method name (int).' },
  { status: 'incorrect', q: 'What is used to call or execute a method?', a: 'Method Invocation / Call', exp: 'A method is executed by referencing its name followed by arguments in parentheses.' },
  { status: 'correct', q: 'When modifying an array element using its index, does the new value replace the previous value?', a: 'True', exp: 'Arrays are mutable; assigning data to a specific index overwrites existing data.' },
  { status: 'correct', q: 'If a nested loop is used for a 2D array, will removing the inner loop still allow all elements to print?', a: 'False', exp: 'The inner loop is strictly required to iterate through the columns of each row.' },
  { status: 'correct', q: 'If a method is declared as private, can it be accessed directly from another class outside its package?', a: 'False', exp: 'Private methods are strictly bound to the class they are declared in.' },
  { status: 'correct', q: 'If an array is declared with a fixed size, can its size dynamically increase?', a: 'False', exp: 'Standard Java arrays have a fixed length upon initialization. Resizing requires creating a new array.' },
  { status: 'correct', q: 'Is it acceptable to use descriptive names that reflect functionality, such as calculateAverage()?', a: 'True', exp: 'Descriptive, camelCase naming is the standard Java best practice.' },
  { status: 'correct', q: 'What part of a method contains the actual code to be executed?', a: 'Method body', exp: 'The body is enclosed in curly braces {} and contains the operational logic.' },
  { status: 'correct', q: 'Which method type returns a value?', a: 'Non-void method', exp: 'Void indicates no return; non-void indicates a specific data type is returned.' },
  { status: 'correct', q: 'In a 2D array representing a table, does the first index represent the row while the second represents the column?', a: 'True', exp: 'Standard matrix notation in Java is array[row][column].' },
  { status: 'incorrect', q: 'What keyword is used to return a value from a method?', a: 'return', exp: 'The return keyword passes data back to the caller and terminates method execution.' },
  { status: 'incorrect', q: 'What method is used to find the length of a string?', a: 'length()', exp: 'String.length() evaluates the character count of a String object.' },
  { status: 'correct', q: 'What is included in a method signature?', a: 'Method name and parameter list', exp: 'The signature does not include the return type or access modifiers.' },
  { status: 'correct', q: 'If a method returns a value, is it optional to store that returned value?', a: 'True', exp: 'You can execute a method for its side-effects without capturing the output.' },
  { status: 'correct', q: 'What Scanner method reads long values?', a: 'nextLong()', exp: 'Parses the next input token as a primitive long.' },
  { status: 'correct', q: 'What is the process of converting Java code into bytecode called?', a: 'Compilation', exp: 'The javac compiler translates human-readable code into JVM bytecode.' },
  { status: 'correct', q: 'If the Scanner class is not closed, will it potentially lead to memory leaks?', a: 'True', exp: 'Unclosed streams maintain active links to OS resources.' },
  { status: 'correct', q: 'If input is provided through files instead of keyboard, is it still a valid form of input?', a: 'True', exp: 'File inputs are handled via the same Scanner or Reader classes.' },
  { status: 'correct', q: 'Which of the following allows multiple words input in Scanner?', a: 'nextLine()', exp: 'next() stops at spaces; nextLine() reads until a line break.' },
  { status: 'correct', q: 'How are command line inputs treated by the JVM?', a: 'As strings', exp: 'The main method receives them as a String[] array.' },
  { status: 'correct', q: 'What class is used to read buffered text input efficiently?', a: 'BufferedReader', exp: 'It minimizes I/O operations by reading chunks of data into a memory buffer.' },
  { status: 'correct', q: 'Which Java class is most widely used for taking user input?', a: 'Scanner', exp: 'java.util.Scanner is the standard utility for parsing primitive types and strings.' },
  { status: 'correct', q: 'Which command runs a compiled Java program?', a: 'java filename', exp: 'The "java" command invokes the JVM to execute the .class file.' },
  { status: 'correct', q: 'Which class wraps System.in to read input in BufferedReader?', a: 'InputStreamReader', exp: 'It acts as a bridge from byte streams to character streams.' },
  { status: 'correct', q: 'If a program uses BufferedReader and calls readLine(), will it capture an entire sentence?', a: 'True', exp: 'readLine() captures all characters including spaces until it hits a line terminator.' },
  { status: 'correct', q: 'If a programmer uses sc.next(), will it correctly read a full name with spaces?', a: 'False', exp: 'It will only capture the first word before the space delimiter.' },
  { status: 'correct', q: 'Can methods like nextInt() automatically convert the input into respective data types?', a: 'True', exp: 'Scanner automatically parses string tokens into primitive values.' },
  { status: 'correct', q: 'Which type of input allows users to provide data through the keyboard while running?', a: 'Keyboard interaction', exp: 'This is standard runtime input via System.in.' },
  { status: 'correct', q: 'Which input type allows data to be passed during execution through terminal commands?', a: 'Command line input', exp: 'Arguments passed before execution begins.' },
  { status: 'correct', q: 'Java executes code randomly.', a: 'False', exp: 'Execution follows strict sequential top-to-bottom logic unless altered by control flow.' },
  { status: 'correct', q: 'Loop component that updates variable.', a: 'Increment/Decrement', exp: 'Updates the control variable to eventually terminate the loop.' },
  { status: 'correct', q: 'What data type is NOT allowed in switch?', a: 'boolean / float', exp: 'Switch evaluates char, byte, short, int, and String, but not floating points or booleans.' },
  { status: 'correct', q: 'int x = 6; if(x % 2 == 0) System.out.println("Even"); else System.out.println("Odd");', a: 'Even', exp: '6 modulo 2 is 0, which triggers the True (if) block.' },
  { status: 'correct', q: 'What happens if break is not used in switch?', a: 'Executes next cases', exp: 'This triggers "fall-through" execution into subsequent cases.' },
  { status: 'correct', q: 'switch can replace if-else-if.', a: 'True', exp: 'When checking equality against a single variable, switch is syntactically cleaner.' },
  { status: 'correct', q: 'Infinite loops never stop unless controlled.', a: 'True', exp: 'Requires a break statement, return, or external program termination.' },
  { status: 'correct', q: 'Keyword that exits a loop.', a: 'break', exp: 'Instantly terminates the loop execution entirely.' },
  { status: 'correct', q: 'Which loop executes at least once?', a: 'do-while', exp: 'The body executes before the condition is evaluated.' },
  { status: 'correct', q: 'Which loop is best when iterations are known?', a: 'for', exp: 'Consolidates initialization, condition, and update into a single readable line.' },
  { status: 'correct', q: 'Which loop is best when iterations are unknown?', a: 'while', exp: 'Checks the condition continuously until it is met.' },
  { status: 'correct', q: 'What is the first part of a for loop?', a: 'Initialization', exp: 'Sets the starting state of the loop control variable.' },
  { status: 'correct', q: 'The if statement only runs when condition is true.', a: 'True', exp: 'Control flow bypasses the block if the condition evaluates to false.' },
  { status: 'correct', q: 'Statement used when condition is false.', a: 'else', exp: 'Acts as the fallback execution path.' },
  { status: 'correct', q: 'What will happen if an if condition is false?', a: 'Executes next line / else', exp: 'The runtime skips the if block and continues normal sequential execution.' }
]

const seatworks = [
  {
    num: 1,
    title: 'Code Tracking & Logical Operations',
    focus: 'Arithmetic · Logical · Binary Operations',
    reflection: `This seatwork focused on the precision required for manual code tracking, specifically regarding arithmetic and logical operations. Mastering the distinction between pre-increment (++i) and post-increment (i++) was a key takeaway, as it demonstrated how Java’s execution order directly impacts variable state management. Additionally, exploring logical short-circuiting showed me how the JVM optimizes evaluations by skipping unnecessary checks, reinforcing the idea that understanding these low-level mechanics is vital for writing efficient and predictable logic in more complex applications.`,
    code: `int i = 5;
int a = ++i; // i becomes 6, a = 6  (pre-increment)
int b = i++; // b = 6, then i becomes 7  (post-increment)
// a=6, b=6, i=7

// Logical short-circuit
boolean result = (i > 0) && (++i < 10);
// Right side only evaluated if left is true`,
  },
  {
    num: 2,
    title: 'Basic ATM System',
    focus: 'Input-Based Options · Arithmetic State Management',
    reflection: `This seatwork allowed me to apply control flow and state management in a practical, interactive scenario by building a functional ATM simulation. Using a while loop and switch cases, I created a menu-driven interface where a single balance variable acts as the system's persistent state, updating in real-time based on user deposits and withdrawals. Beyond just practicing arithmetic operators, this exercise taught me the importance of input validation, ensuring logic handles scenarios like insufficient funds or exceeding withdrawal limits to maintain the integrity of the data throughout the program's execution.`,
    code: `import java.util.Scanner;

public class ATMTransactionCounterChacon {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        double balance = 8000.0; 
        int transactionCount = 0;
        int choice = 0;

        // Requirement: while loop for continuous transactions
        while (choice != 4) {
            System.out.println("=====ATM MENU=====");
            System.out.println("1. Check Balance");
            System.out.println("2. Deposit");
            System.out.println("3. Withdraw");
            System.out.println("4. Exit");
            System.out.print("Choice: ");
            choice = input.nextInt();

            // Requirement: Switch case for menu selection
            switch (choice) {
                case 1:
                    transactionCount++;
                    System.out.println("Balance: " + balance);
                    break;
                case 2:
                    transactionCount++;
                    System.out.print("Deposit: ");
                    double depositAmt = input.nextDouble();
                    balance += depositAmt;
                    System.out.println("New Balance: " + balance);
                    break;
                case 3:
                    transactionCount++;
                    System.out.print("Withdraw: ");
                    double withdrawAmt = input.nextDouble();
                    if (withdrawAmt > 2000) {
                        System.out.println("Exceeds maximum withdrawal");
                    } else if (withdrawAmt > balance) {
                        System.out.println("Insufficient funds");
                    } else {
                        balance -= withdrawAmt;
                        System.out.println("New balance = " + balance);
                    }
                    break;
                case 4:
                    System.out.println("Transaction Count: " + transactionCount);
                    System.out.println("Exit system. Thanks - Chacon ATM");
                    break;
                default:
                    System.out.println("Invalid Choice. Try again.");
            }
        }
        input.close();
    }
}`,
  },
  {
    num: 3,
    title: 'Student Age Analyzer',
    focus: 'Structured Control Flow · if-else Statements',
    reflection: `In this seatwork, I focused on building a clean and unambiguous hierarchy of conditions to categorize student ages. By separating the classification logic into a dedicated getAgeCategory method, I moved beyond simple sequential code toward a more modular approach, which is a key principle in OOP. This exercise reinforced the importance of using precise relational operators to ensure that every possible input from a child to a senior—falls into exactly one category without any logical overlap or 'dead zones' in the code.This was an exercise in creating clean, structured control flow. I learned to use precise conditions to categorize data accurately, ensuring that the program returns the correct classification based on variable input, a clean hierarchy of conditions with no ambiguity.`,
    code: `import java.util.Scanner;

public class StudentAgeAnalyzerChacon{
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);

        System.out.print("Input your Student name: ");
        String studentName = input.nextLine();

        System.out.print("Input your Age: ");
        int Age = input.nextInt();

        String category = getAgeCategory(Age);

        System.out.println("Your information: ");
        System.out.println("Student Name: " + studentName);
        System.out.println("Age: " + Age);
        System.out.println("Category: " + category);

        input.close();
    }

    public static String getAgeCategory(int age){
        String category = null;

        if (age >= 0 && age <= 12){
            category = "Child";
        } else if (age >= 13 && age <= 19){
            category = "Teenager";
        } else if (age >= 20 && age <= 59){
            category = "Adult";
        } else if (age >= 60){
            category = "Senior";
        }
        return category;
    }
}`,
  },
]

const activities = [
  {
    num: 1,
    title: 'Variable Tracking & Data Types',
    focus: 'Manual tracing of memory allocation and data classification',
    tags: ['Primitive Types', 'Reference Types', 'Memory Allocation', 'Data Integrity'],
    explanation: `I focused on the architectural distinction between Primitive and Reference types. Choosing the correct variable type is not just about syntax—it's about memory optimization and ensuring data integrity across a system. Primitives live on the stack, providing fast access for simple values, while objects reside on the heap, allowing for more complex data structures.`,
    learnings: `Tracing the memory allocation of the Student class revealed how reference variables function in practice. I learned that when s3 is assigned to s2, they both point to the same memory address on the heap; consequently, modifying one affects the other. This highlighted the importance of understanding "pass-by-value" for primitives versus "pass-by-reference" behavior for objects to avoid unintended side effects in my code.`,
    code: `class Student {
    String name;
    int grade;
 
    Student(String n, int g) {
        name = n;
        grade = g;
    }
}
 
public class TestStudent {
    public static void main(String[] args) {
        Student s1 = new Student("John", 85);
        Student s2 = new Student("Maria", 90);
        Student s3 = s2;
 
        s1.grade = 95;
        s3.name = "Ana";
 
        System.out.println(s1.name + " " + s1.grade);
        System.out.println(s2.name + " " + s2.grade);
        System.out.println(s3.name + " " + s3.grade);
    }
}`,
  },
  {
    num: 2,
    title: 'Character Stat Systems (Operators)',
    focus: 'Bitwise shifts and arithmetic assignment for state management',
    tags: ['Bitwise Operations', 'State Management', 'Game Logic', 'Binary Math'],
    explanation: `Implementing bitwise shifts for power amplification taught me how to perform high-speed calculations at a binary level. It reinforced the importance of writing predictable logic when dealing with complex calculations like comboStrike—operations you'd use in a real game engine to maximize performance by bypassing traditional arithmetic overhead.`,
    learnings: `I realized that bitwise operators are essential tools for low-level optimization. Learning that a left shift (<<) functions as a high-speed alternative to multiplication by powers of two gave me a deeper appreciation for how the JVM handles rapid state updates. This activity showed me that writing efficient code often requires looking beneath the surface of standard math to understand how the computer actually processes data.`,
    code: `public class CharacterStats {
    static int baseAttack  = 10;
    static int defense     = 5;
    static int mana         = 100;

    public static void main(String[] args) {
        // Left shift = multiply by 2^n (fast!)
        int comboStrike = baseAttack << 2; // 10 * 4 = 40
        int critHit     = baseAttack << 1; // 10 * 2 = 20

        // Right shift = divide by 2^n
        int halfDamage  = comboStrike >> 1; // 40 / 2 = 20

        // Compound assignment operators
        mana  -= 25;        // mana = mana - 25 = 75
        defense += critHit; // defense = 5 + 20 = 25

        System.out.printf(
          "Combo: %d | Crit: %d | Mana: %d | Defense: %d%n",
          comboStrike, critHit, mana, defense
        );
    }
}`,
  },
  {
    num: 3,
    title: 'Simple Wallet (System Persistence)',
    focus: 'Transaction-based state machine with while(running) loop',
    tags: ['State Persistence', 'Resource Cleanup', 'Switch-Case', 'Scanner Management'],
    explanation: `I implemented a persistent state machine where the user's balance remains consistent across different operations using a while(running) loop. I also explored Resource Cleanup by ensuring the Scanner object is properly closed—a pattern directly analogous to professional database connection management and resource handling.`,
    learnings: `This project reinforced the concept of maintaining a stable program state through a continuous loop. I learned that a system is only as reliable as its input validation; by implementing checks for insufficient funds or invalid inputs, I ensured the wallet's integrity remained intact. It taught me that handling the "edge cases" is just as important as building the core features of an application.`,
    code: `import java.util.Scanner;

public class SimpleWalletChacon{
    public static void main (String[] args){
        Scanner input = new Scanner(System.in);
        double balance = 3000.0;
        int transactionCount = 0;
        boolean running = true;

        while(running){
            System.out.println("=====WALLET MENU=====");
            System.out.println("1. View Balance");
            System.out.println("2. Add Money");
            System.out.println("3. Spend Money");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");

            int choice = input.nextInt();

            switch(choice){
                case 1:
                    System.out.println("Your Current Balance: " + balance + " pesos");
                    break;
                case 2:
                    System.out.print("Enter the ammount to add: ");
                    double addAmount = input.nextDouble();
                    if(addAmount > 0){
                        balance += addAmount;
                        transactionCount++;
                        System.out.println("Transaction Complete. New balance: " + balance);
                    } else {
                        System.out.println("Invalid amount.");
                    }
                    break;
                case 3:
                    System.out.print("Enter ammount to Spend: ");
                    double spendAmount = input.nextDouble();
                    if(spendAmount > 1000){
                        System.out.println("Exceeds maximum spend. Nax: 1000, try again.");
                    } else if (spendAmount > balance){
                        System.out.println("Not enough balance!");
                    } else {
                        balance -= spendAmount;
                        transactionCount++;
                        System.out.println("Spending Succesful. New Balance: " + balance);
                    }
                    break;
                case 4:
                    running = false;
                    System.out.println("Exiting... Total Transaction Count:" + transactionCount);
                    break;
                default:
                    System.out.println("Invalid Choice! Please try again!");
            }
        }
        input.close();
    }
}`,
  },
  {
    num: 4,
    title: 'Grade Evaluation (Control Structures)',
    focus: 'Automated academic remark generator using printf formatted output',
    tags: ['if-else if Chains', 'printf Formatting', 'Logic Optimization', 'Branching'],
    explanation: `I focused on the efficiency of if-else if chains. By structuring conditions from 'Excellent' down to 'Failed,' the program executes fewer checks on average for high-performing students—a deliberate optimization of the logical flow that mirrors how I think about performance and priority in larger software systems.`,
    learnings: `Beyond basic branching, this activity introduced me to the power of printf for professional string formatting and decimal precision. I learned that the order of logical conditions is a design choice that affects both the readability of the code and its execution speed. Mastering these control structures allows me to create programs that are both logically sound and user-friendly.`,
    code: `public class GradeEvaluationChacon {
    public static void main(String[] args){
        double prelim = 85;
        double midterm = 78;
        double finals = 90;
        double average = (prelim + midterm + finals) / 3;

        System.out.println("Prelim Grade: " + prelim);
        System.out.println("Midterm Grade: " + midterm);
        System.out.println("Final Grade: " + finals);

        System.out.printf("Average: %.2f", average);

        if (average >= 90 && average <= 100){
            System.out.println("Remark: Excellent");
        } else if (average >= 80){
            System.out.println("Remark: Good");
        } else if (average >= 75){
            System.out.println("Remark: Fair");
        } else {
            System.out.println("Remark: Failed");
        }
    }
}`,
  },
  {
    num: 5,
    title: 'Personal Expense Tracker (Modular Programming)',
    focus: 'Multi-method application with separated logic into static modules',
    tags: ['Static Methods', 'Modular Design', 'Scalability', 'Real-World Application'],
    explanation: `I treated this as a real-world tool, adopting Static Methods to handle specific tasks like budget checking and expense calculation. This modularity makes the code significantly easier to debug and scale—mirroring how I approach organizational SOPs and system-wide pipelines where each method has one specific job.`,
    learnings: `Moving toward a modular design taught me the benefits of "Separation of Concerns." By isolating different functionalities into separate methods, I found that I could test and refine individual parts of the program without breaking the whole system. This approach is a major step toward writing professional-grade, maintainable code that can grow as requirements become more complex.`,
    code: `import java.util.Scanner;

public class ExpenseTrackerChacon{

    static float totalFoodExpense = 0.f;
    static float totalTransformationExpense = 0.f;
    static float miscellaneous = 0.f;

    public static void main(String[] args){
        Scanner input = new Scanner(System.in);
        float monthlyBudget = 0.f;

        Menu();

        System.out.print("Please enter your current month budget: ");
        monthlyBudget += input.nextFloat();

        float totalExpenses = expenseCalculator();
        String statusMessage = budgetChecker(monthlyBudget, totalExpenses);

        displayStatus(monthlyBudget, totalExpenses, statusMessage);
    }

    public static void Menu(){
        Scanner input = new Scanner(System.in);
        System.out.println("Budget Expense Tracker ( Monthly ) ");
        System.out.print("\\nWelcome Carl, Back to tracking your budget again? ");
        String answer = input.nextLine();
        
        if (answer.equals("Yes")){
            System.out.println("Great!");
        } else if (answer.equals("No")){
            System.out.println("Well, if you're not, Have a Greate Day!");
        } else {
            System.out.println("Maybe you're into something else? Sorry I would not be able to help you with that. ");
        }
    }

    public static float expenseCalculator(){
        Scanner input = new Scanner(System.in);
        float totalExpenses = 0.f;
        boolean running = true;

        while(running){
            System.out.println("Choose which expense you would like to track: ");
            System.out.println("1. Food");
            System.out.println("2. Transportation");
            System.out.println("3. Other Expenses");
            System.out.println("4. Done");
            System.out.print("Your Choice: ");

            int choice = input.nextInt();

            switch(choice){
                case 1:
                    System.out.print("Enter the amount of food expenses: ");
                    totalFoodExpense += input.nextFloat();
                    break;
                case 2:
                    System.out.print("enter the amound of transportation expenses: ");
                    totalTransformationExpense += input.nextFloat();
                    break;
                case 3:
                    System.out.print("Enter the amount of other expenses: ");
                    miscellaneous += input.nextFloat();
                    break;
                case 4: 
                    totalExpenses = totalFoodExpense + totalTransformationExpense + miscellaneous;
                    running = false;
                    break;
            }   
        }
        return totalExpenses;
    }

    public static String budgetChecker(float budget, float expense){
        float remainingBalance = budget - expense;
        if(expense > budget){
            return "Your expenses reached out the maximum budget!";
        } else if (expense < budget){
            return "Your expenses are within the budget, here's what is remaining: " + remainingBalance;
        } else if (expense == budget){
            return "Well you're just on track equally";
        } else {
            return "Error, you might've missed something, 404";
        }
    }

    public static void displayStatus(float monthlyBalance, float totalExpenses, String status){
        System.out.println("\\nOverall Status:");
        System.out.println("Your current monthly balance: " + monthlyBalance);
        System.out.println("Your total food expenses: " + totalFoodExpense);
        System.out.println("Your total transportation expenses: " + totalTransformationExpense);
        System.out.println("Your total other expenses: " + miscellaneous);
        System.out.println("Your total overall expenses: " + totalExpenses);
        System.out.println("Budget Status: " + status);
        
        float currentAmmount = monthlyBalance - totalExpenses;
        System.out.println("Your remaining balance: " + currentAmmount);
    }
}`,
  },
]

// Fixed: Defined tabs with 'as const' to strictly match the state type
const tabs = [
  { id: 'quizzes', label: 'Quizzes' },
  { id: 'seatworks', label: 'Seatworks' },
  { id: 'activities', label: 'Activities' },
  { id: 'exam', label: 'Midterm Exam' }
] as const;

/* ─── Page Component ──────────────────────────────── */
export default function MidtermPage() {
  const [activeTab, setActiveTab] = useState<'quizzes' | 'seatworks' | 'activities' | 'exam'>('quizzes')

  return (
    <main className="min-h-screen text-white selection:bg-emerald-500/30 overflow-x-hidden">
      <MidtermCursorLight />
      <div className="fixed inset-0 grid-pattern opacity-[0.1] pointer-events-none -z-10" />

      {/* ── HEADER ── */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto text-center md:text-left">
          <p className="font-mono text-xs tracking-widest uppercase text-emerald-400 mb-3">&gt; Phase 01</p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Midterm <Typewriter words={["Outputs", "Deliverables", "Archives"]} />
          </h1>
          <p className="text-[#8b92a8] text-lg max-w-2xl leading-relaxed mx-auto md:mx-0">
            A comprehensive technical archive of quizzes, seatworks, and programs
            from the Midterm phase of Object-Oriented Programming.
          </p>
        </div>
      </section>

      {/* ── IDE TAB NAVIGATION ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mb-8">
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#0f172a]/60 backdrop-blur-md border border-white/5 rounded-xl w-fit mx-auto md:mx-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold font-mono transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                  : 'text-[#8b92a8] hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── DYNAMIC CONTENT AREA ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-32">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: QUIZZES */}
          {activeTab === 'quizzes' && (
            <motion.div
              key="quizzes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Assessment <Typewriter words={["Quizzes", "Examinations", "Tests"]} />
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* QUIZ 1: Face-to-Face */}
                <div className="glass-card flex flex-col justify-between rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="font-mono text-xs text-[#8b92a8] mb-2 uppercase tracking-widest">Quiz 01</p>
                        <h3 className="text-xl font-bold text-white">Java Fundamentals</h3>
                      </div>
                      <span className={`px-4 py-2 rounded-lg font-mono text-sm font-bold bg-[#0f172a]/80 border border-white/10 text-emerald-400 shadow-lg flex-shrink-0`}>
                        25 / 30
                      </span>
                    </div>
                    <p className="font-mono text-xs text-emerald-400 mb-4">Core Syntax · Data Handling · Information Structures</p>
                    
                    <div className="text-[#8b92a8] text-sm leading-relaxed mb-6 border-l-2 border-emerald-500/50 pl-5 bg-[#0f172a]/40 p-5 rounded-r-xl shadow-inner">
                      <p className="font-bold text-white text-xs uppercase tracking-wider mb-2 opacity-80">Post-Assessment Reflection</p>
                      {`Since this first assessment was conducted face-to-face, it served as a grounded introduction to Java that required a high level of preparedness without the aid of external resources. Coming from a C# background, the transition was relatively smooth, but the quiz highlighted important Java-specific nuances such as default variable values and the memory distinction between primitives and objects. It was a helpful reminder that even with prior experience, mastering these fundamental data handling structures from the ground up is essential for a solid foundation in Object-Oriented Programming.`}
                    </div>

                    <div className="flex-1 mb-6 rounded-xl border border-white/10 bg-[#0d1117] p-6 flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="font-mono text-xs text-emerald-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Competency Verification
                      </div>

                      <div className="space-y-5">
                        <div>
                          <div className="flex justify-between text-xs font-mono text-[#8b92a8] mb-2">
                            <span>Syntax Translation (C# → Java)</span>
                            <span className="text-emerald-400">90%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#0f172a] rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500/80 w-[90%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono text-[#8b92a8] mb-2">
                            <span>Primitive vs Object Memory Mapping</span>
                            <span className="text-emerald-400">80%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#0f172a] rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500/80 w-[80%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono text-[#8b92a8] mb-2">
                            <span>Default Variable Initialization</span>
                            <span className="text-emerald-400">85%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#0f172a] rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500/80 w-[85%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-emerald-400/80 font-mono text-[10px] uppercase text-center tracking-widest">
                        System Foundation: Stable
                      </div>
                    </div>
                    
                    <div className="p-4 bg-[#0f172a]/40 rounded-xl border border-white/5 flex items-center gap-3 mt-auto">
                      <div className="w-2 h-2 flex-shrink-0 rounded-full animate-pulse bg-amber-500/80" />
                      <span className="font-mono text-[10px] text-[#8b92a8] uppercase tracking-wider leading-relaxed">
                        Assessment conducted face-to-face. Hardcopy retained by instructor.
                      </span>
                    </div>
                  </div>
                </div>

                {/* QUIZ 2: Online */}
                <div className="glass-card flex flex-col justify-between rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="font-mono text-xs text-[#8b92a8] mb-2 uppercase tracking-widest">Quiz 02</p>
                        <h3 className="text-xl font-bold text-white">Arrays & Methods</h3>
                      </div>
                      <span className={`px-4 py-2 rounded-lg font-mono text-sm font-bold bg-[#0f172a]/80 border border-white/10 text-indigo-400 shadow-lg flex-shrink-0`}>
                        41 / 45
                      </span>
                    </div>
                    <p className="font-mono text-xs text-indigo-400 mb-4">Control Flow · Loops · Methods · Scanner Input</p>
                    
                    <div className="text-[#8b92a8] text-sm leading-relaxed mb-6 border-l-2 border-indigo-500/50 pl-5 bg-[#0f172a]/40 p-5 rounded-r-xl shadow-inner">
                      <p className="font-bold text-white text-xs uppercase tracking-wider mb-2 opacity-80">Post-Assessment Reflection</p>
                      {`This module proved to be a significant challenge due to the strict time limit and the identification format of the assessment. While I understood the underlying logic of the questions, the requirement to provide exact terminology under pressure resulted in a few errors where my conceptual "idea" didn't quite match the specific Java keywords required. This experience emphasized that in programming, it isn't enough to just understand how a process like array indexing or method invocation works; you must also master the precise technical vocabulary and syntax to communicate effectively with the compiler and other developers.`}
                    </div>

                    <div className="flex-1 min-h-[250px] max-h-[350px] overflow-y-auto mb-6 rounded-xl border border-white/10 bg-[#0d1117] p-5 text-xs font-mono custom-scrollbar">
                      <div className="text-white/50 mb-6 border-b border-white/5 pb-3">
                        [SYSTEM LOG] Attempt 1 | Time: 25 mins | Score: 41/45 | Submitted Mar 26 at 8:32pm
                      </div>
                      
                      <div className="space-y-6">
                        {quiz2Data.map((item, index) => (
                          <div key={index} className="border-b border-white/5 pb-4 last:border-0">
                             <div className="flex gap-2 leading-relaxed">
                                <span className={`flex-shrink-0 font-bold ${item.status === 'correct' ? 'text-emerald-400' : 'text-amber-500'}`}>
                                    [{item.status === 'correct' ? '✓' : '✗'}]
                                </span>
                                <span className="text-[#e2e8f0]">Q{index + 1}: {item.q}</span>
                             </div>
                             
                             <div className="ml-6 mt-2 flex flex-col gap-1.5">
                               <div className="text-indigo-300">
                                 <span className="text-[#8b92a8] mr-2">Answer:</span> {item.a}
                               </div>
                               <div className="text-[#8b92a8] italic bg-[#0f172a]/50 p-2 rounded border border-white/5">
                                 <span className="text-white/40 mr-2 not-italic">Explanation:</span> {item.exp}
                               </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-[#0f172a]/40 rounded-xl border border-white/5 flex items-center gap-3 mt-auto">
                      <div className="w-2 h-2 flex-shrink-0 rounded-full animate-pulse bg-indigo-500/80" />
                      <span className="font-mono text-[10px] text-[#8b92a8] uppercase tracking-wider leading-relaxed">
                        Online assessment. Partial log recovered. Manual verification pending.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SEATWORKS */}
          {activeTab === 'seatworks' && (
            <motion.div
              key="seatworks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Practical <Typewriter words={["Exercises", "Seatworks", "Drills"]} />
                </h2>
              </div>
              {seatworks.map((sw) => (
                <div key={sw.num} className="glass-card rounded-2xl p-8 lg:p-10 border border-white/5">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                      SW 0{sw.num}
                    </span>
                    <h3 className="text-2xl font-bold text-white">{sw.title}</h3>
                  </div>
                  <p className="font-mono text-sm text-[#8b92a8] mb-8">{sw.focus}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 flex flex-col gap-6">
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">Reflection</p>
                        <p className="text-[#8b92a8] text-sm leading-relaxed bg-[#0f172a]/40 p-5 rounded-xl border border-white/5">
                          {sw.reflection}
                        </p>
                      </div>

                      {sw.num !== 1 && (
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">Document Viewer</p>
                          <div className="group relative h-[500px] w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
                            <iframe 
                              src={`/pdfs/seatwork-${sw.num}.pdf`} 
                              className="w-full h-full bg-white opacity-60 saturate-50 group-hover:opacity-100 group-hover:saturate-100 transition-all duration-500"
                              title={`Seatwork ${sw.num} Document`}
                            />
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500">
                              <span className="bg-black/50 text-white/50 px-4 py-2 rounded-lg font-mono text-xs backdrop-blur-sm border border-white/5">
                                Hover to interact
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="lg:col-span-7">
                      <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">Implementation</p>
                      <CodeBlock filename={`Seatwork${sw.num}.java`} code={sw.code} />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 3: ACTIVITIES */}
          {activeTab === 'activities' && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Core <Typewriter words={["Programs", "Applications", "Systems"]} />
                </h2>
              </div>
              {activities.map((act) => (
                <div key={act.num} className="glass-card rounded-2xl overflow-hidden border border-white/5">
                  <div className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                        ACT 0{act.num}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{act.title}</h3>
                    </div>
                    <p className="font-mono text-sm text-[#8b92a8] mb-6">{act.focus}</p>
                    <div className="flex flex-wrap gap-2">
                      {act.tags.map((tag) => (
                        <span key={tag} className="font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 bg-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                      <div className="xl:col-span-5 flex flex-col gap-6">
                        <div>
                          <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">Explanations</p>
                          <p className="text-[#8b92a8] text-sm leading-relaxed bg-[#0f172a]/40 p-5 rounded-xl border border-white/5">
                            {act.explanation}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">Key Learnings</p>
                          <p className="text-[#c9d1d9] text-sm leading-relaxed bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/20 border-l-4 border-l-emerald-500">
                            {act.learnings}
                          </p>
                        </div>

                        <div className="flex-1">
                          <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">Document Viewer</p>
                          <div className="group relative h-[500px] w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
                            <iframe 
                              src={`/pdfs/activity-${act.num}.pdf`} 
                              className="w-full h-full bg-white opacity-60 saturate-50 group-hover:opacity-100 group-hover:saturate-100 transition-all duration-500"
                              title={`Activity ${act.num} Document`}
                            />
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500">
                              <span className="bg-black/50 text-white/50 px-4 py-2 rounded-lg font-mono text-xs backdrop-blur-sm border border-white/5">
                                Hover to interact
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="xl:col-span-7">
                        <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">Source Code</p>
                        <CodeBlock filename={`Activity${act.num}.java`} code={act.code} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 4: EXAM */}
          {activeTab === 'exam' && (
            <motion.div
              key="exam"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Major <Typewriter words={["Examination", "Assessment", "Milestone"]} />
                </h2>
              </div>
              
              <div className="glass-card rounded-2xl overflow-hidden border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                <div className="p-8 border-b border-white/5 bg-emerald-500/5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-sm text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 rounded-lg font-bold">
                      MIDTERM EXAM
                    </span>
                    <h3 className="text-2xl font-bold text-white">Comprehensive OOP Assessment</h3>
                  </div>
                  <p className="font-mono text-sm text-[#8b92a8]">Synthesis of Java Fundamentals, Control Flow, and State Management</p>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <div className="flex flex-col gap-6">
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">Post-Exam Reflection</p>
                        <p className="text-[#c9d1d9] text-sm leading-relaxed bg-[#0f172a]/40 p-6 rounded-xl border border-white/5 border-l-4 border-l-emerald-500 shadow-inner">
                          {`"Taking the Midterm Exam was a significant test of my ability to transition from passive learning to active, high-pressure problem solving. Without the safety net of a compiler, I had to rely on my mental model of the JVM to trace complex loops and determine the state of variables in real-time. The exam pushed me to be more precise with Java’s specific syntax, especially in areas like method signatures and array boundaries reinforcing that while my logic is strong, the "identification" aspect of the course requires a mastery of exact technical terminology. I’m looking forward to the results to see where my mental "reverse engineering" matched the actual output and where I can further sharpen my precision."`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-[#0d1117]/80 border border-dashed border-emerald-500/30 rounded-xl p-10 text-center relative overflow-hidden">
                      <motion.div 
                        animate={{ y: ["0%", "400%", "0%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent pointer-events-none"
                      />
                      
                      <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-emerald-500 animate-spin mb-6" />
                      <h4 className="text-emerald-400 font-mono text-lg font-bold mb-3 tracking-widest uppercase">
                        Awaiting Results
                      </h4>
                      <p className="text-[#8b92a8] text-sm max-w-sm leading-relaxed">
                        The technical examination has been completed. Evaluation metrics, verified code, and official scoring are currently pending instructor release.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="py-12 text-center opacity-40 border-t border-white/5">
        <p className="text-[10px] font-mono tracking-[0.4em] uppercase">
          &copy; 2026 Mel Carl A. Chacon · BSIT 2-1 · OOP
        </p>
      </footer>
    </main>
  )
}