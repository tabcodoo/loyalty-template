export const convertPaginationToString = ({index = 0, count = 10, search = null}) => {
    let string = `?PaginationModel.Index=${index}&PaginationModel.Count=${count}`;
    if (search) string += `&PaginationModel.SearchTerm=${search}`;

    return string;
};

export const convertFilterModelsToString = ({
    filterIndex = 0,
    filterDescriptor = '',
    filterId = 0,
    // paginationModel = null,
}) => {
    let string = `?filterModels[${filterIndex}].filterDescriptor=${filterDescriptor}&filterModels[${filterIndex}].filterValue=${filterId}`;
    // if (paginationModel) convertPaginationToString(paginationModel);

    return string;
};

export const convertSortingToString = (sortingModels) => {
    let string = '';
    sortingModels.forEach(
        (model, id) =>
            (string += `&SortingModels[${id}].sortingDescriptor=${model.sortingDescriptor}&SortingModels[${id}].sortingValue=${model.sortingValue}`),
    );

    return string;
};
