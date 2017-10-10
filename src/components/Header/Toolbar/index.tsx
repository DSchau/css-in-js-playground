import * as React from 'react';
import glamorous, { withTheme } from 'glamorous';
import { darken, lighten } from 'polished';
import AddIcon from 'react-icons/lib/md/add';
import kebab from 'lodash.kebabcase';

import { Theme, ThemeProps, SANS_SERIF } from '../../../style/';

const ToolbarContainer = glamorous.div<ThemeProps>({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  overflowX: 'auto',
  maxWidth: '100%',
  width: '100%',
  paddingRight: 4,
  paddingLeft: 4,
  boxSizing: 'border-box'
}, ({ theme }) => ({
  backgroundColor: darken(0.05, theme[theme.primary].base),
  borderBottom: `1px solid ${darken(0.1, theme[theme.primary].base)}`
}));

const Files = glamorous.ul<ThemeProps>({
  display: 'flex',
  overflowX: 'auto',
  margin: 0,
  padding: 0,
  width: '100%'
});

const File = glamorous.li<ThemeProps>({
  fontSize: 14,
  margin: 0,
  listStyleType: 'none',
  padding: 12,
}, SANS_SERIF, ({ theme }) => ({
  color: theme[theme.primary].text
}));

const AddFileButton = glamorous.button<ThemeProps>({
  border: 'none',
  boxSizing: 'border-box',
  margin: 0,
  marginLeft: 12,
  paddingRight: 12,
  paddingLeft: 12
}, ({ theme }) => ({
  backgroundColor: lighten(0.1, theme[theme.primary].base),
  color: theme[theme.primary].text,
}));

interface Props {
  files: string[];
}

function Toolbar({ files }: Props) {
  return (
    <ToolbarContainer>
      <Files>
        {
          files
            .map((file, index) => <File key={file}>{`${kebab(file)}.js`}</File>)
        }
      </Files>
      <AddFileButton><AddIcon /></AddFileButton>
    </ToolbarContainer>
  );
}

export default Toolbar;
