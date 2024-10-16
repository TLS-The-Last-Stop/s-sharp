package com.tls.ssharp.post.service.impl;

import com.tls.ssharp.post.dto.request.PostRequest;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.post.entity.Tag;
import com.tls.ssharp.post.repository.PostRepository;
import com.tls.ssharp.post.repository.TagRepository;
import com.tls.ssharp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final TagRepository tagRepository;

    public void savePost(PostRequest postRequest) {
        List<String> hashTags = postRequest.getTags();

        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());

        postRepository.save(post);

        for (String hashTag : hashTags) {
            Tag tag = new Tag();
            tag.setName(hashTag);
            tagRepository.save(tag);
        }
    }
}
