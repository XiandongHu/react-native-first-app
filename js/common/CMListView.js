/**
 * @flow
 */

'use strict';

var ListView = require('ListView');
var Dimensions = require('Dimensions');
var Platform = require('Platform');
var StyleSheet = require('StyleSheet');
var React = require('React');
var View = require('View');

type Rows = Array<Object>;
type RowsAndSections = {
  [sectionID: string]: Object;
};

export type Data = Rows | RowsAndSections;
type RenderElement = () => ?ReactElement<any>;

type Props = {
  data: Data;
  minContentHeight: number;
  contentInset: { top: number; bottom: number; };
  needSeparator: boolean;
  renderEmptyList?: ?RenderElement;
};

type State = {
  contentHeight: number;
  dataSource: ListView.DataSource;
};

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;

class CMListView extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    data: [],
    // TODO: This has to be scrollview height + fake header
    minContentHeight: Dimensions.get('window').height + 20,
    contentInset: {top: 0, bottom: 0},
    needSeparator: true,
  };

  constructor(props: Props) {
    super(props);

    let dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      contentHeight: 0,
      dataSource: cloneWithData(dataSource, props.data),
    };

    (this: any).renderSeparator = this.renderSeparator.bind(this);
    (this: any).renderFooter = this.renderFooter.bind(this);
    (this: any).onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.data),
      });
    }
  }

  render() {
    const { contentInset } = this.props;
    const bottom = contentInset.bottom +
      Math.max(0, this.props.minContentHeight - this.state.contentHeight);
    return (
      <ListView
        ref="listview"
        initialListSize={10}
        pageSize={LIST_VIEW_PAGE_SIZE}
        {...this.props}
        dataSource={this.state.dataSource}
        renderSeparator={this.renderSeparator}
        renderFooter={this.renderFooter}
        contentInset={{bottom, top: contentInset.top}}
        onContentSizeChange={this.onContentSizeChange}
      />
    );
  }

  onContentSizeChange(contentWidth: number, contentHeight: number) {
    if (contentHeight !== this.state.contentHeight) {
      this.setState({contentHeight});
    }
  }

  scrollTo(...args: Array<any>) {
    this.refs.listview.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this.refs.listview.getScrollResponder();
  }

  renderSeparator(sectionID, rowID): ?ReactElement<any> {
    if (this.props.needSeparator) {
      return <View style={styles.separator} key={rowID} />;
    }

    return null;
  }

  renderFooter(): ?ReactElement<any> {
    if (this.state.dataSource.getRowCount() === 0) {
      return this.props.renderEmptyList && this.props.renderEmptyList();
    }

    return this.props.renderFooter && this.props.renderFooter();
  }
}

function cloneWithData(dataSource: ListView.DataSource, data: ?Data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

var styles = StyleSheet.create({
  separator: {
    backgroundColor: '#eeeeee',
    height: 1,
  },
});

module.exports = CMListView;
