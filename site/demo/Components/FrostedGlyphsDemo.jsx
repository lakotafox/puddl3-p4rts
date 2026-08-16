import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { FiBarChart2, FiBook, FiCloud, FiEdit, FiFileText, FiHeart } from 'react-icons/fi';
import { Box } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';

import FrostedGlyphs from '../../content/Components/FrostedGlyphs/FrostedGlyphs';
import { frostedGlyphs } from '../../constants/code/Components/frostedGlyphsCode';

const DEFAULT_PROPS = {
  colorful: false
};

const FrostedGlyphsDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { colorful } = props;

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'FrostedGlyphsItem[]',
        default: '[]',
        description:
          'Array of items to render. Each item should include: an icon (React.ReactElement), a color (string), a label (string), and an optional customClass (string).'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Optional additional CSS class(es) to be added to the container.'
      }
    ],
    []
  );

  const items = [
    { icon: <FiFileText />, color: colorful ? 'blue' : '#444', label: 'Files' },
    { icon: <FiBook />, color: colorful ? 'purple' : '#444', label: 'Books' },
    { icon: <FiHeart />, color: colorful ? 'red' : '#444', label: 'Health' },
    { icon: <FiCloud />, color: colorful ? 'indigo' : '#444', label: 'Weather' },
    { icon: <FiEdit />, color: colorful ? 'orange' : '#444', label: 'Notes' },
    { icon: <FiBarChart2 />, color: colorful ? 'green' : '#444', label: 'Stats' }
  ];

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden">
            <FrostedGlyphs items={items} className="my-frosted-glyphs" />
          </Box>

          <Customize>
            <PreviewSwitch
              title="Colorful"
              isChecked={colorful}
              onChange={checked => {
                updateProp('colorful', checked);
              }}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={frostedGlyphs} componentName="FrostedGlyphs" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default FrostedGlyphsDemo;
