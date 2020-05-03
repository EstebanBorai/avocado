import * as React from 'react';
import './request.scss';
import Control from 'components/Control';
import Input from 'components/Input';
import Button from 'components/Button';

const INITIAL_VALUE = 'Hello World';

function Request(): JSX.Element {
  const [value, setValue] = React.useState<string>(INITIAL_VALUE);

  const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, [value]);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = event.target.value;

    setValue(textValue);
  }, [value]);

  return (
    <Control title="Request">
      <form id="server" onSubmit={handleSubmit}>
        <Input
          id="input"
          type="text"
          value={value}
          label="Message"
          name="url"
          placeholder="ws://"
          onChange={handleChange}
        />
        <Button
          id="button"
          text="Send"
          type="submit"
          intent="primary"
          onClick={() => ''}
        />
      </form>
    </Control>
  );
}

export default Request;