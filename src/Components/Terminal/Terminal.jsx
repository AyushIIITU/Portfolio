import React, { useState } from 'react';

function Terminal() {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState([]);

  // Define available commands and their output
  const commands = {
    'npm help': 'Available commands: npm i resume, npm i project --github, npm i connect, cls',
    'npm i resume': 'Downloading resume...',
    'npm i project --github': 'Opening GitHub project link: https://github.com/your-github/project',
    'npm i connect': 'Navigating to connection page...',
    'cls': 'clear',
  };

  const handleCommand = (command) => {
    // Check if the command exists
    if (commands[command]) {
      if (command === 'cls') {
        // Clear the terminal
        setOutput([]);
      } else {
        // Add the result to the output array
        setOutput([...output, `> ${command}`, commands[command]]);
      }
    } else {
      // Handle invalid commands
      setOutput([...output, `> ${command}`, 'Error: command not found']);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleCommand(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="input-container container mx-auto overflow-auto flex flex-col bg-[#0F172A] p-[15px] gap-[10px] rounded-[20px] text-white">
      <div className="terminal-output">
        {output.map((line, index) => (
          <p key={index} className="text-[.8rem]">{line}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-[5px]">
        <p className="bash-text text-[.8rem]">
          <span className="user text-[#E879F9]">user</span>
          <span className="vm text-[#2DD4BF]">@ui-verse</span>:
          <span className="char text-[#A78BFA]">~</span>$
        </p>
        <input
          className="input bg-transparent border-none outline-none text-white flex-grow"
          placeholder="Enter a command"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Terminal;
