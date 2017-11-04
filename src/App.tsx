import * as React from 'react';
import glamorous, { ThemeProvider } from 'glamorous';
import { css } from 'glamor';
import queryString from 'query-string';

import { CodeProvider, Footer, Header, Provider, Timer } from './components';

import { GLOBAL } from './style';
import { OfflineContainer } from './utils/offline';

const Container = glamorous.main({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative'
});

interface Props {}

function App(props: Props) {
  return (
    <OfflineContainer
      render={updated => {
        return (
          <Provider>
            {({ actions, activeModule, code, library, snippets, theme }) => (
              <ThemeProvider theme={theme}>
                <Container>
                  <Header
                    activeModule={activeModule}
                    library={library}
                    onSelect={actions.handleSelect}
                    primary={theme.primary}
                    onActiveChange={actions.handleActiveChange}
                    onColorSwitch={actions.handleColorSwitch}
                    onFileAdd={actions.handleFileAdd}
                    files={Object.keys(code)}
                    snippets={snippets}
                    theme={theme}
                  />
                  <CodeProvider
                    activeModule={activeModule}
                    library={library}
                    code={code}
                    onUpdate={actions.handleCodeUpdate}
                  />
                  <Footer code={code} onReset={actions.handleReset} />
                  {updated && (
                    <Timer
                      duration={10000}
                      onElapsed={actions.handleTimerComplete}
                    />
                  )}
                </Container>
              </ThemeProvider>
            )}
          </Provider>
        );
      }}
    />
  );
}

GLOBAL.split(/\n{2}/).forEach(rule => {
  css.insert(rule);
});

export default App;
