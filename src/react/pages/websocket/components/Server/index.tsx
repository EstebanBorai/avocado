import * as React from 'react';
import './server.scss';
import Control from 'components/Control';
import Input from 'components/Input';
import Button from 'components/Button';

const INITIAL_VALUE = 'wss://';

function Server(): JSX.Element {
  const [value, setValue] = React.useState<string>(INITIAL_VALUE);

  const isConnectDisabled = React.useMemo(() => {
    return value === INITIAL_VALUE;
  }, [value]);

  const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, [value]);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = event.target.value;

    setValue(textValue);
  }, [value]);

  return (
    <Control title="Server">
      <form id="server" onSubmit={handleSubmit}>
        <Input
          id="input"
          type="text"
          value={value}
          label="URL"
          name="url"
          placeholder="wss://"
          onChange={handleChange}
        />
        <Button
          id="button"
          text="Connect"
          type="submit"
          intent="primary"
          disabled={isConnectDisabled}
          onClick={() => ''}
        />
      </form>
    </Control>
  );
}

export default Server;
