export function entityStrategyFor(type) {
    return function(contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(
          (character) => {
            const entityKey = character.getEntity()
            return (entityKey !== null 
              && contentState.getEntity(entityKey).getType() === type)
          },
          callback
        )
      }
}

export function decorator(strategy, component) {
    return {
        strategy,
        component
    }
}

export function basicDecorator(type, component) {
    return {
        strategy: entityStrategyFor(type),
        component: component
    }
}