import React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

export function Search({ defaultValue, onChange, messages, loading, cancel }) {

  return (
    <div className="Search">
      <Dropdown
          label="Department:"
          defaultSelectedKey="D"
          options={[
            { key: 1, text: 'DEPT 1' },
            { key: 2, text: 'DEPT 2' },
            { key: 3, text: 'DEPT 3' },
            { key: 4, text: 'DEPT 4' },
          ]}
          onChange={(evt,item) => onChange(item.key)}
        />
        <Dropdown
        label="Employeee:"
        defaultSelectedKey="D"
        options={[
          { key: 1, text: 'Employee 1' },
          { key: 2, text: 'Employee 2' },
          { key: 3, text: 'Employee 3' },
          { key: 4, text: 'Employee 4' },
        ]}
        onChange={(evt,item) => onChange(item.key)}
      />
      {loading && (
        <PrimaryButton text="Get Lists" onClick={cancel}/>
      )}
      {messages.length > 0 && (
        <ul>
          {messages.map(message =>
            <li key={message.text} className={`Message Message--${message.type}`}>
              {message.text}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
