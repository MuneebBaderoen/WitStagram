import {getRandomListItem} from '../services/DataService.js/index.js'

const FeedListItem = props => {
  return (
    <Card
      style={styles.card}
      elevation={8}
      onPress={props.onCardPress}
    >
      <Card.Content style={styles.cardTitle}>
        <Avatar.Image
          style={styles.cardAvatar}
          size={40}
          source={{ uri: contact.uri }}
        />
        <Title>{props.contact.name}</Title>
      </Card.Content>

      <Card.Cover source={{ uri: props.photoUri }} />
      <Card.Actions>
        <IconButton
          icon={props.active ? "favorite" : "favorite-border"}
          color={"#46acb2"}
          size={20}
          onPress={props.toggleLike.bind(this, i)}
        />
      </Card.Actions>
      <Card.Content style={styles.cardTitle}>
        <Paragraph>{catFact}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const SimpleListComponent = props => {
  return (

  )
};

const ScrollingListComponent = props => {

}

const FlatListComponent = props => {
  return (
    <FlatList
      refreshing={props.isListRefreshingTop}
      data={props.photos}
      onRefresh={props.onRefreshTop}
      keyExtractor={(item, index) => item.node.image.uri + index}
      onEndReached={props.onRefreshBottom}
      onEndReachedThreshold={0.5}
      renderItem={listItem => {
        const p = listItem.item;
        const i = listItem.index;
        const catFact =getRandomListItem(props.facts, i);
        const contact =getRandomListItem(props.contacts, i);
        return (
          <FeedListItem
            key={i}
            catFact={catFact}
            contact={contact}
            photoUri={p.node.image.uri}
          />
        );
      }}
      ListFooterComponent={
        props.isListRefreshingBottom && (
          <View style={{ flex: 1, padding: 10 }}>
            <ActivityIndicator size="large" />
          </View>
        )
      }
    />
  );
};
