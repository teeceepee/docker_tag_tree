json.array!(@repos) do |repo|
  json.extract! repo, :id, :name, :tag_count
  json.url repo_url(repo, format: :json)
end
