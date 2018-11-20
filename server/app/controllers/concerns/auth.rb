module Auth
  def is_current_user(id)
    if current_user
      if current_user.id === id
        return true
      end
    end
    false
  end
end