package com.tls.ssharp.post.service.impl;

import com.tls.ssharp.post.dto.request.PostRequest;
import com.tls.ssharp.post.dto.response.PostResponse;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.post.entity.Tag;
import com.tls.ssharp.post.repository.PostRepository;
import com.tls.ssharp.post.repository.TagRepository;
import com.tls.ssharp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<PostResponse> getAllPost() {
        return postRepository.findAll().stream()
                .map(post -> {
                    PostResponse postResponse = new PostResponse();
                    postResponse.setId(post.getId());
                    postResponse.setTitle(post.getTitle());
                    postResponse.setContent(post.getContent());
                    return postResponse;
                })
                .collect(Collectors.toList());
    }

    public PostResponse getPostById(long id) {
        Optional<Post> post = postRepository.findById(id);
        PostResponse postResponse = new PostResponse();
        if (post.isPresent()) {
            postResponse.setId(id);
            postResponse.setTitle(post.get().getTitle());
            postResponse.setContent(post.get().getContent());
        }
        return postResponse;
    }

    public void deletePostById(long id) {
        postRepository.deleteById(id);
    }
}