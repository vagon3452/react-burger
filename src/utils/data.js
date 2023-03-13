const RequestAPI = () => {
  const url = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    setState({ ...state, isLoading: true, hasError: false });
    fetch(url)
      .then((res) => res.json())
      .then((json) =>
        setState({
          ...state,
          isLoading: false,
          hasError: false,
          data: json.data,
        })
      )
      .catch((err) => setState({ ...state, isLoading: false, hasError: true }));
  }, []);
  const { data, isLoading, hasError } = state;
};

export default RequestAPI;
